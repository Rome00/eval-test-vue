<template>
    <div class="bg-gray-50">
        <div class="fixed inset-x-0 z-10 h-[109px] bg-white shadow-md">
            <div class="container mx-auto flex h-full items-center justify-between px-4">
                <div class="text-lg font-bold capitalize">some title</div>
                <button
                    class="rounded-lg bg-blue-600 px-16 py-4 text-base font-semibold text-white md:px-[22px] md:py-[16px] lg:text-xl"
                >
                    Nächste Frage
                </button>
            </div>
        </div>
        <div class="min-h-[calc(100vh-109px)]">
            <div class="container mx-auto pt-[109px] font-Hind">
                <div class="flex items-center py-[50px] px-4">
                    <div class="pr-6">
                        <svg class="h-8 w-8" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M13.0986 0.331604H31.8836C39.2286 0.331604 44.1469 5.48827 44.1469 13.1583V30.8621C44.1469 38.5104 39.2286 43.6649 31.8836 43.6649H13.0986C5.75358 43.6649 0.813583 38.5104 0.813583 30.8621V13.1583C0.813583 5.48827 5.75358 0.331604 13.0986 0.331604ZM22.4586 15.6304C21.4403 15.6304 20.5953 14.7833 20.5953 13.7454C20.5953 12.6838 21.4403 11.8388 22.5019 11.8388C23.5419 11.8388 24.3869 12.6838 24.3869 13.7454C24.3869 14.7833 23.5419 15.6304 22.4586 15.6304ZM24.3652 30.1904C24.3652 31.2304 23.5203 32.0754 22.4586 32.0754C21.4186 32.0754 20.5736 31.2304 20.5736 30.1904V20.6138C20.5736 19.5716 21.4186 18.7071 22.4586 18.7071C23.5203 18.7071 24.3652 19.5716 24.3652 20.6138V30.1904Z"
                                fill="#F3983F"
                            />
                        </svg>
                    </div>
                    <p class="text-base font-normal md:text-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod accusantium magnam culpa autem
                        quam id blanditiis vel deserunt cumque. Provident ipsa fugiat error magnam. Eaque expedita
                        quisquam ullam deleniti? Fugiat.
                    </p>
                </div>

                <div class="rounded-lg bg-white pt-[40px] shadow-full">
                    <div
                        class="mb-[220px] px-6 font-Hind text-[14px] leading-[2rem] sm:text-[16px] md:px-[60px] md:text-[22px] md:leading-[3.5rem] lg:pb-0"
                    >
                        <span v-for="(text, index) in splitData" :key="index">
                            <span class="whitespace-pre-line">{{ text }}</span>
                            <span
                                v-if="index !== splitData.length - 1"
                                :id="'box_' + index"
                                @dragenter="handleDragEnter"
                                @dragover.prevent="handleDragOver"
                                @dragleave="handleDragLeave"
                                @drop.prevent="handleDrop"
                            >
                                <span
                                    class="empty-box pointer-events-none mx-2 inline-flex items-center justify-center space-x-1.5 rounded-lg border border-gray-400 px-8 py-2 md:mx-6 md:py-3 md:px-16"
                                >
                                    <span class="h-2 w-2 rounded-full bg-brand"></span>
                                    <span class="h-2 w-2 rounded-full bg-brand"></span>
                                    <span class="h-2 w-2 rounded-full bg-brand"></span>
                                </span>
                            </span>
                        </span>
                    </div>
                    <div
                        class="fixed left-0 right-0 bottom-0 z-10 w-full border-t border-dashed border-gray-500 bg-gray-50 py-8 sm:px-[60px] md:pointer-events-auto lg:mt-8 lg:py-11"
                    >
                        <div class="container mx-auto">
                            <div class="grid grid-cols-12 gap-y-4 sm:gap-y-6 lg:gap-12">
                                <span
                                    v-for="word in wordList"
                                    :key="word.id"
                                    class="col-span-6 flex items-center justify-center sm:col-span-4 lg:col-span-3"
                                >
                                    <span
                                        :id="'variant_' + word.id"
                                        :draggable="word.draggable"
                                        :data-id="word.id"
                                        class="item-box relative px-3 mx-6 min-w-[130px] items-center justify-center space-x-1.5 rounded-lg py-0.5 text-center text-sm font-semibold leading-normal sm:min-w-[170px] sm:text-lg md:inline-flex"
                                        :class="[
                                            word.draggable
                                                ? 'cursor-pointer bg-brand text-white'
                                                : 'border border-brand bg-brand/20 text-brand/40',
                                        ]"
                                        @click="addItem"
                                        @dragstart="handleDragStart"
                                    >
                                        {{ word.name }}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
// template for removing item
const template = `
    <span class="close-btn absolute top-0 right-0 block translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-pink-500 p-1">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	</span>
`
// static text data with missing words
const textData =
    'Liebe Claudia, \n entschuldige, dass ich mich so lange nicht bei dir gemeldet Wie du weißt, bin ich vor zwei Wochen --- Deswegen hatte ich leider keine Zeit --- meine Freunde. Aber deinen Vorschlag,mal wieder gemeinsam --- Tag miteinander zu verbringen, finde ich sehr gut. Mir passt es auch am besten am Wochenende. Würde es bei dir schon  --- Samstag gehen? Da habe ich noch nichts vor.Es würde --- natürlich freuen, wenn du dir bei dieser Gelegenheit auch meine neue Wohnung anschaust. Es ist wunderbar, so viel zu haben.Was meinst du, wir uns bei mir treffen und dann unsere Einkaufstour machen? Oder ist es dir ---, wenn wir zuerst einkaufen und am Abend zusammen kochen und essen? Übrigens, können wir dein Auto nehmen? --- steht schon wieder in der Werkstatt.Schreib mir doch bald, ob du an diesem Tag Zeit hast. ---  du keine Zeit hast, finden wir sicher einen anderen Tag.  \n Marion'
const splitData = textData.split('---')

let filledWords = ref([])
const dragAllowed = ref(true)

// generate filled words array defending from static text data missing word count
let i = 0
while (i < splitData.length - 1) {
    filledWords.value.push({ id: i, word: '' })
    i++
}
// array of fill word objects
let wordList = ref([
    { name: 'umgezogen', id: 0, draggable: true },
    { name: 'mich', id: 1, draggable: true },
    { name: 'einen', id: 2, draggable: true },
    { name: 'nächsten', id: 3, draggable: true },
    { name: 'für', id: 4, draggable: true },
    { name: 'lieber', id: 5, draggable: true },
    { name: 'wollen', id: 6, draggable: true },
    { name: 'Meines', id: 7, draggable: true },
])

function handleDragStart(ev) {
    dragAllowed.value = true
    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setData('text', ev.target.outerHTML)
}
function handleDragEnter(ev) {
    ev.target.style.opacity = '0.4'
}

function handleDragOver(ev) {
    ev.preventDefault()
    ev.target.style.opacity = '0.4'
    return false
}

function handleDragLeave(ev) {
    ev.target.style.opacity = '1'
}

/**
 * It handles the drop event, stops the page from refreshing, sets the opacity of the target to 1, gets
 * the id of the target, updates the filledWords array, mounts the remove item template, and adds a
 * click event to the remove item button
 * @param ev - the event object
 */
function handleDrop(ev) {
    // stop refresh for some browsers
    ev.stopPropagation()
    ev.target.style.opacity = '1'
    const target = ev.target
    const boxId = parseInt(ev.target.id.split('_')[1])
    // update filledWords array when word is dropped if there is not already a word in the target
    if (ev.target.children.length > 0 && !ev.target.classList.contains('item-box')) {
        const draggedItem = ev.dataTransfer.getData('text')
        const dropedItem = ev.target
        dropedItem.innerHTML += draggedItem
        // mount remove item template and add click event with removeItem function
        const wordId = parseInt(ev.dataTransfer.getData('text').split('data-id="')[1].split('"')[0])
        ev.target.children[0].style.display = 'none'
        ev.target.children[1].innerHTML += template
        // disable draggable on vatient after successfull drop
        wordList.value.filter((el) => {
            if (el.id === wordId) {
                el.draggable = false
            }
        })
        filledWords.value.filter((elm) => {
            if (elm.id === boxId) {
                elm.word = target.innerText
            }
        })

        ev.target.lastChild.lastElementChild.addEventListener('click', () => removeItem(wordId, boxId, dropedItem))
    } else {
        dragAllowed.value = false
    }
}

/**
 * It removes the word from the list and makes it draggable again
 * @param itemId - the id of the word template
 * @param id - the id of the word that was dropped
 * @param parentEl - the parent element of the item you want to remove
 */
function removeItem(wordId, boxId, parentEl) {
    console.log(wordId, boxId, parentEl)
    parentEl.children[0].style.display = 'inline-flex'
    parentEl.children[1].remove()
    wordList.value.filter((el) => {
        if (el.id === wordId) {
            el.draggable = true
        }
    })

    filledWords.value.filter((elm) => {
        if (elm.id === boxId) {
            elm.word = ''
        }
    })
}

function addItem(ev) {
    let counter = 0
    const wordId = parseInt(ev.target.dataset.id)

    wordList.value.filter((el) => {
        if (el.id === wordId) {
            el.draggable = false
        }
    })
    counter = filledWords.value.findIndex((el) => el.word === '')

    const wordBox = document.getElementById('box_' + counter)

    filledWords.value.filter((elm) => {
        if (elm.id === counter) {
            elm.word = ev.target.innerText
        }
    })
    wordBox.innerHTML += ev.target.outerHTML
    wordBox.children[0].style.display = 'none'
    wordBox.children[1].innerHTML += template

    wordBox.children[1].lastElementChild.addEventListener('click', () => removeItem(wordId, counter, wordBox))
}
</script>

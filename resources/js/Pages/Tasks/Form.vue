<template>
    <div class="fixed inset-x-0 h-[109px] bg-white shadow-md">
        <div class="container mx-auto flex h-full items-center justify-between">
            <div class="text-lg font-bold capitalize">some title</div>
            <button class="rounded-lg bg-blue-600 px-[22px] py-[16px] text-xl font-semibold text-white">
                Nächste Frage
            </button>
        </div>
    </div>
    <div class="bg-gray-50" @touchend="drop">
        <div class="container mx-auto pt-[109px] font-Hind">
            <div class="flex items-center py-[50px]">
                <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.0986 0.331604H31.8836C39.2286 0.331604 44.1469 5.48827 44.1469 13.1583V30.8621C44.1469 38.5104 39.2286 43.6649 31.8836 43.6649H13.0986C5.75358 43.6649 0.813583 38.5104 0.813583 30.8621V13.1583C0.813583 5.48827 5.75358 0.331604 13.0986 0.331604ZM22.4586 15.6304C21.4403 15.6304 20.5953 14.7833 20.5953 13.7454C20.5953 12.6838 21.4403 11.8388 22.5019 11.8388C23.5419 11.8388 24.3869 12.6838 24.3869 13.7454C24.3869 14.7833 23.5419 15.6304 22.4586 15.6304ZM24.3652 30.1904C24.3652 31.2304 23.5203 32.0754 22.4586 32.0754C21.4186 32.0754 20.5736 31.2304 20.5736 30.1904V20.6138C20.5736 19.5716 21.4186 18.7071 22.4586 18.7071C23.5203 18.7071 24.3652 19.5716 24.3652 20.6138V30.1904Z"
                        fill="#F3983F"
                    />
                </svg>
                <p class="pl-6 text-xl font-normal">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod accusantium magnam culpa autem quam id
                    blanditiis vel deserunt cumque. Provident ipsa fugiat error magnam. Eaque expedita quisquam ullam
                    deleniti? Fugiat.
                </p>
            </div>
            <div class="rounded-lg bg-white pt-[40px] shadow-md" @touchmove="move">
                <div class="px-[60px] font-Hind text-[22px] leading-[3.5rem]">
                    <span v-for="(text, index) in splitData" :key="index">
                        <span class="whitespace-pre-line">{{ text }}</span>
                        <span
                            v-if="index !== splitData.length - 1"
                            :id="'box_' + index"
                            @dragenter="handleDragEnter"
                            @dragover="handleDragOver"
                            @dragleave="handleDragLeave"
                            @drop="handleDrop"
                            @touchend="drop"
                        >
                            <span
                                v-if="!filledWords[index].filled"
                                class="empty-box pointer-events-none mx-6 inline-flex items-center justify-center space-x-1.5 rounded-lg border border-gray-400 px-16 py-3"
                            >
                                <span class="h-2 w-2 rounded-full bg-brand"></span>
                                <span class="h-2 w-2 rounded-full bg-brand"></span>
                                <span class="h-2 w-2 rounded-full bg-brand"></span>
                            </span>
                        </span>
                    </span>
                </div>
                <div
                    class="fixed left-0 right-0 bottom-0 mt-8 w-full border-t border-dashed border-gray-500 bg-gray-50 px-[60px] pt-11 pb-11 lg:relative lg:bg-transparent"
                >
                    <div class="grid grid-cols-12 gap-y-6 md:gap-12">
                        <div
                            v-for="word in wordList"
                            :key="word.id"
                            class="col-span-6 flex items-center justify-center sm:col-span-4 lg:col-span-3"
                        >
                            <span
                                :id="'variant_' + word.id"
                                :draggable="word.draggable"
                                :data-id="word.id"
                                class="item-box relative mx-6 hidden min-w-[170px] items-center justify-center space-x-1.5 rounded-lg py-0.5 text-center text-lg font-semibold leading-normal md:inline-flex"
                                :class="[
                                    word.draggable
                                        ? 'cursor-pointer bg-brand text-white'
                                        : 'border border-brand bg-brand/20 text-brand/40',
                                ]"
                                @click="addItem"
                                @dragstart="handleDragStart"
                                @dragend="handleDragEnd"
                                @touchstart="pickup"
                            >
                                {{ word.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
// template for close 
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
const textData =
    'Liebe Claudia, \n entschuldige, dass ich mich so lange nicht bei dir gemeldet Wie du weißt, bin ich vor zwei Wochen --- Deswegen hatte ich leider keine Zeit --- meine Freunde. Aber deinen Vorschlag,mal wieder gemeinsam --- Tag miteinander zu verbringen, finde ich sehr gut. Mir passt es auch am besten am Wochenende. Würde es bei dir schon  --- Samstag gehen? Da habe ich noch nichts vor.Es würde --- natürlich freuen, wenn du dir bei dieser Gelegenheit auch meine neue Wohnung anschaust. Es ist wunderbar, so viel zu haben.Was meinst du, wir uns bei mir treffen und dann unsere Einkaufstour machen? Oder ist es dir ---, wenn wir zuerst einkaufen und am Abend zusammen kochen und essen? Übrigens, können wir dein Auto nehmen? --- steht schon wieder in der Werkstatt.Schreib mir doch bald, ob du an diesem Tag Zeit hast. ---  du keine Zeit hast, finden wir sicher einen anderen Tag.  \n Marion'
const splitData = textData.split('---')
let filledWords = ref([])

const dragAllowed = ref(true)

let i = 0
while (i < splitData.length - 1) {
    filledWords.value.push({ id: i, word: '', filled: false })
    i++
}

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
    ev.dataTransfer.setData('text/html', ev.target.outerHTML)
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
function handleDrop(ev) {
    ev.stopPropagation()
    ev.target.style.opacity = '1'
    const target = ev.target
    const id = parseInt(ev.target.id.split('_')[1])
    if (ev.target.children.length > 0 && !ev.target.classList.contains('item-box')) {
        filledWords.value[id] = {
            id: id,
            word: target.innerText,
            filled: true,
        }
        console.log(ev.target)
        setTimeout(() => {
            const draggedItem = ev.dataTransfer.getData('text/html')
            const dropedItem = ev.target
            dropedItem.innerHTML += draggedItem
            const itemId = parseInt(ev.dataTransfer.getData('text/html').split('data-id="')[1].split('"')[0])
            ev.target.children[0].innerHTML += template
            ev.target.lastChild.lastElementChild.addEventListener('click', () =>
                removeItem(id, itemId, dropedItem, draggedItem)
            )
        }, 100)
    } else {
        dragAllowed.value = false
    }
}
// after drop disable drag on original element
function handleDragEnd(ev) {
    if (dragAllowed.value) {
        const dataId = parseInt(ev.target.dataset.id)
        wordList.value.filter((el) => {
            if (el.id === dataId) {
                el.draggable = false
            }
        })
    }
}

function removeItem(itemId, id, parentEl) {
    parentEl.children[0].remove()
    wordList.value.filter((el) => {
        if (el.id === id) {
            el.draggable = true
        }
    })
    // for oneTime test
    // parentEl.children[0].removeAttribute('style')

    /* NOTE this should hide empty word template with v-show but not updating on data change v-if gives error
    I think it's issue with laravel implementation very strange */
    filledWords.value[itemId] = {
        id: itemId,
        word: '',
        filled: false,
    }
}

function addItem(ev) {
    console.log(ev)
    let counter = 0
    filledWords.value.filter((el) => {
        if (el.word !== '') {
            counter++
        }
    })
    if (counter < 1) {
        filledWords.value[counter] = {
            id: counter,
            word: ev.target.innerText,
            filled: true,
        }
        document.getElementById('box_' + counter).innerHTML += ev.target.outerHTML
        document.getElementById('box_' + counter).children[1].innerHTML += template
    }
}

// touch
/* let moving = null

function pickup(event) {
	moving = event.target

	moving.style.height = moving.clientHeight
	moving.style.width = moving.clientWidth
	moving.style.position = 'fixed'
}
function move(event) {
	if (moving) {
		console.log(event.changedTouches[0])
		// touchmove - assuming a single touchpoint
		moving.style.left = event.changedTouches[0].clientX - moving.clientWidth / 2
		moving.style.top = event.changedTouches[0].clientY - moving.clientHeight / 2
	}
}
function drop(event) {
	console.log(event);
	if (moving) {
		if (event.currentTarget.tagName !== 'HTML') {
			let target = null
			if (event.clientX) {
				target = document.elementFromPoint(event.clientX, event.clientY)
			} else {
				target = document.elementFromPoint(
					event.changedTouches[0].clientX,
					event.changedTouches[0].clientY
				)
			}

			target.appendChild(moving)
		}

		// reset our element
		moving.style.left = ''
		moving.style.top = ''
		moving.style.height = ''
		moving.style.width = ''
		moving.style.position = ''
		moving.style.zIndex = ''

		moving = null
	}
} */
</script>

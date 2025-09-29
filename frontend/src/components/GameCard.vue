<template>
    <div v-if="isShowing" ref="interactElement" class="card"
        :class="{ isAnimating: isInteractAnimating, isCurrent: isCurrent }"
        :style="{ transform: transformString || undefined }">
        <h3 class="cardTitle">{{ card.name }}</h3>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, PropType, watch } from "vue";
import interact from "interactjs";
import type { Class } from "@/services/apiService";

const ACCEPT_CARD = "cardAccepted";
const REJECT_CARD = "cardRejected";
const SKIP_CARD = "cardSkipped";

const props = defineProps<{
    card: Class;
    isCurrent: boolean;
    
}>();

const emit = defineEmits<{
    (e: "hideCard", card: Class): void;
    (e: "cardAccepted", card: Class): void;
    (e: "cardRejected", card: Class): void;
    (e: "cardSkipped", card: Class): void;
}>();

// === Constants ===
const interactMaxRotation = 15;
const interactOutOfSightXCoordinate = 500;
const interactOutOfSightYCoordinate = 600;
const interactYThreshold = 150;
const interactXThreshold = 100;

// === Reactive State ===
const isShowing = ref(true);
const isInteractAnimating = ref(true);
const isInteractDragged = ref(false);
const interactPosition = ref({ x: 0, y: 0, rotation: 0 });

const interactElement = ref<HTMLElement | null>(null);

// === Computed transform ===
const transformString = computed(() => {
    if (!isInteractAnimating.value || isInteractDragged.value) {
        const { x, y, rotation } = interactPosition.value;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
    }
    return null;
});

// === Helpers ===
function interactSetPosition(coordinates: { x?: number; y?: number; rotation?: number }) {
    const { x = 0, y = 0, rotation = 0 } = coordinates;
    interactPosition.value = { x, y, rotation };
}

function interactUnsetElement() {
    if (interactElement.value) {
        interact(interactElement.value).unset();
        isInteractDragged.value = true;
    }
}

function resetCardPosition() {
    interactSetPosition({ x: 0, y: 0, rotation: 0 });
}

function hideCard() {
    setTimeout(() => {
        isShowing.value = false;
        emit("hideCard", props.card);
    }, 300);
}

function playCard(interaction: string) {
    interactUnsetElement();

    switch (interaction) {
        case ACCEPT_CARD:
            interactSetPosition({
                x: interactOutOfSightXCoordinate,
                rotation: interactMaxRotation,
            });
            emit("cardAccepted", props.card);
            break;
        case REJECT_CARD:
            interactSetPosition({
                x: -interactOutOfSightXCoordinate,
                rotation: -interactMaxRotation,
            });
            emit("cardRejected", props.card);
            break;
        case SKIP_CARD:
            interactSetPosition({
                y: interactOutOfSightYCoordinate,
            });
            emit("cardSkipped", props.card);
            break;
    }

    hideCard();
}

// === Lifecycle & Watcher ===

// This function will set up or tear down the interactjs instance
function setupInteract(isDraggable: boolean) {
    if (interactElement.value) {
        if (isDraggable) {
            interact(interactElement.value).draggable({
                onstart: () => {
                    isInteractAnimating.value = false;
                },
                onmove: (event) => {
                    const x = interactPosition.value.x + event.dx;
                    const y = interactPosition.value.y + event.dy;

                    let rotation = interactMaxRotation * (x / interactXThreshold);
                    if (rotation > interactMaxRotation) rotation = interactMaxRotation;
                    else if (rotation < -interactMaxRotation) rotation = -interactMaxRotation;

                    interactSetPosition({ x, y, rotation });
                },
                onend: () => {
                    const { x, y } = interactPosition.value;
                    isInteractAnimating.value = true;

                    if (x > interactXThreshold) playCard(ACCEPT_CARD);
                    else if (x < -interactXThreshold) playCard(REJECT_CARD);
                    else if (y > interactYThreshold) playCard(SKIP_CARD);
                    else resetCardPosition();
                },
            });
        } else {
            // If it's no longer the current card, unset its interact instance
            interact(interactElement.value).unset();
        }
    }
}

// NEW WATCHER: This is the key to the solution!
watch(() => props.isCurrent, (isNowCurrent) => {
    setupInteract(isNowCurrent);
}, {
    immediate: true // This will run the watcher once on component mount
});

onBeforeUnmount(() => {
    if (interactElement.value) {
        interact(interactElement.value).unset();
    }
});

// The old onMounted is no longer needed for this logic
/*
onMounted(() => {
  if (!props.isCurrent || !interactElement.value) return;
  // ... All this logic has been moved into the watch effect
});
*/
onMounted(() => {
  if (props.isCurrent) {
    setupInteract(true);
  }
});
</script>




<style lang="scss" scoped>
@use "../styles/index.scss" as *;

$cardsTotal: 3;
$cardsWidth: 300px;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.125em;

.card {
    @include card();
    @include absolute((top: 0, left: 0, bottom: 0, right: 0));
    @include sizing((100%, 80vw));
    @include flex-center();

    @include after() {
        @include sizing(21px 3px);
        @include absolute(right 0 bottom 11px left 0);

        margin: auto;
        border-radius: 100px;
        background: rgba($c-black, 0.3);
    }

    display: flex;
    max-height: 350px;
    margin: auto;
    font-size: $fs-h2;
    font-weight: $fw-bold;
    color: $c-white;
    background-image: linear-gradient(-180deg,
        $primary-gradient-start 2%,
        $primary-gradient-end 100%);
    opacity: 0;
    transform: translateY($defaultTranslation) scale($defaultScale);
    transform-origin: 50%,
    100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    user-select: none;
    pointer-events: none;
    will-change: transform,
    opacity;

    height: 100vw;

    &.isCurrent {
        pointer-events: auto;
    }

    &.isAnimating {
        transition: transform 0.7s $ease-out-back;
    }
}

.cardTitle {
    margin: 0 0 15px;
    font-size: $fs-card-title;
}

@for $i from 1 through $cardsTotal {
    $index: $i - 1;
    $translation: $cardsPositionOffset * $index;
    $scale: 1 - ($cardsScaleOffset * $index);

    .card:nth-child(#{$i}) {
        z-index: $cardsTotal - $index;
        opacity: 1;
        transform: translateY($translation) scale($scale);

        @if $i ==3 {
            color: $c-red-25;
            background-color: $c-red-25;
        }

        @else if $i ==2 {
            color: $c-red-50;
            background-color: $c-red-50;
        }

        @if $i !=1 {
            background-image: none;

            @include after() {
                @include sizing(0 0);
            }
        }
    }
}
</style>

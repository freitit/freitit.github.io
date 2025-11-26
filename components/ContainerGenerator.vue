<template>
  <div class="tool-view" :class="{ 'active': isActive }">
    <div class="mb-6">
      <button 
        class="back-button text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center" 
        @click="$emit('back')"
      >
        ← Back to Tools
      </button>
    </div>
    
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 border">
        <div class="text-emerald-500 mb-4">
          <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-medium text-gray-900 mb-6">Container Number Generator</h3>
        <button 
          class="text-lg font-medium text-gray-900 border border-gray-300 px-8 py-4 rounded-full shadow-md hover:border-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 hover:text-white active:text-white transition-all duration-200 mb-6" 
          @click="generateNumber"
        >
          Generate
        </button>
        
        <!-- Auto-copy notification -->
        <div class="mb-4 text-center">
          <p class="text-sm text-gray-600">Numbers are automatically copied to clipboard when generated</p>
        </div>
        
        <!-- Generated numbers list -->
        <div class="w-full max-w-lg">
          <div class="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto" ref="generatedList">
            <p v-if="generatedNumbers.length === 0" class="text-gray-500 text-center py-8 text-sm">
              No container numbers generated yet
            </p>
            <div 
              v-for="(item, index) in generatedNumbers" 
              :key="item.id"
              class="list-item p-3 border-b border-gray-200 last:border-b-0 rounded cursor-pointer"
              :class="{ 'generate-animation': index === 0 && item.isNew }"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="font-mono text-2xl font-black text-gray-900 tracking-wide">{{ item.number }}</div>
                  <div class="timestamp text-xs text-gray-500 mt-1">
                    Generated: {{ formatTimestamp(item.timestamp) }}
                  </div>
                </div>
                <button 
                  class="item-copy-button bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-all duration-200 text-xs ml-4" 
                  @click="copyToClipboard(item.number)" 
                  title="Copy to clipboard"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Clear list button -->
        <button 
          v-if="generatedNumbers.length > 0"
          class="mt-4 text-sm text-gray-500 hover:text-red-500 transition-colors duration-200" 
          @click="clearList"
        >
          Clear All
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { generateContainerNumber } from '~/utils/containerUtils'

defineEmits(['back'])

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const generatedNumbers = ref([])

const generateNumber = async () => {
  const containerNumber = generateContainerNumber()
  const timestamp = new Date()
  const id = Date.now()
  
  // Auto-copy to clipboard
  try {
    await navigator.clipboard.writeText(containerNumber)
    showTooltip("Generated and copied to clipboard!")
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea")
    textArea.value = containerNumber
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    showTooltip("Generated and copied to clipboard!")
  }
  
  // Add to list
  generatedNumbers.value.unshift({ 
    id, 
    number: containerNumber, 
    timestamp, 
    isNew: true 
  })
  
  // Remove animation flag after animation completes
  setTimeout(() => {
    if (generatedNumbers.value[0]?.id === id) {
      generatedNumbers.value[0].isNew = false
    }
  }, 300)
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    showTooltip("Copied to clipboard!")
  } catch (err) {
    const textArea = document.createElement("textarea")
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    showTooltip("Copied to clipboard!")
  }
}

const clearList = () => {
  generatedNumbers.value = []
}

const formatTimestamp = (timestamp) => {
  const now = new Date()
  const diffMs = now - timestamp
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  
  if (diffSeconds < 60) {
    return 'Just now'
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  } else {
    return timestamp.toLocaleDateString() + ' ' + timestamp.toLocaleTimeString()
  }
}

const showTooltip = (message) => {
  // Create and show temporary tooltip
  const tooltip = document.createElement('div')
  tooltip.className = 'fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50 transition-all duration-300'
  tooltip.textContent = message
  document.body.appendChild(tooltip)
  
  setTimeout(() => {
    tooltip.classList.add('opacity-0')
    setTimeout(() => {
      if (document.body.contains(tooltip)) {
        document.body.removeChild(tooltip)
      }
    }, 300)
  }, 2000)
}
</script>

<style scoped>
.tool-view {
  display: none;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
}

.tool-view.active {
  display: block;
  opacity: 1;
  transform: translateY(0);
}
</style>
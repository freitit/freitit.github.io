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
    
    <div class="max-w-md mx-auto">
      <div class="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 border">
        <div class="text-blue-500 mb-4">
          <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-medium text-gray-900 mb-4">Container Number Checker</h3>
        <p class="text-sm text-gray-600 mb-6 text-center">Enter a container number to validate its format and check digit</p>
        
        <div class="w-full max-w-sm">
          <input 
            type="text" 
            v-model="containerInput"
            placeholder="e.g. ABCD1234567"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-mono text-lg uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxlength="11"
            @keypress="handleKeyPress"
            @input="formatInput"
          >
          <button 
            class="w-full mt-4 text-lg font-medium text-gray-900 border border-gray-300 px-6 py-3 rounded-full shadow-md hover:border-blue-500 hover:bg-blue-400 active:bg-blue-600 hover:text-white active:text-white transition-all duration-200" 
            @click="checkContainer"
          >
            Check
          </button>
        </div>
        
        <!-- Result display -->
        <div v-if="showResult" class="mt-6 w-full max-w-sm">
          <div 
            class="p-4 rounded-lg border" 
            :class="resultClasses"
          >
            <div class="flex items-center justify-center mb-2">
              <svg v-if="isValid" class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <svg v-else class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="text-center font-medium">{{ resultMessage }}</div>
            <div class="text-center text-sm mt-2">{{ resultDetails }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { validateContainerNumber } from '~/utils/containerUtils'

defineEmits(['back'])

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const containerInput = ref('')
const showResult = ref(false)
const isValid = ref(false)
const resultMessage = ref('')
const resultDetails = ref('')

const resultClasses = computed(() => {
  return isValid.value 
    ? "bg-green-50 border-green-200 text-green-800"
    : "bg-red-50 border-red-200 text-red-800"
})

const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    checkContainer()
  }
}

const formatInput = (e) => {
  e.target.value = e.target.value.toUpperCase()
  containerInput.value = e.target.value
}

const checkContainer = () => {
  const containerNumber = containerInput.value.trim()
  
  if (!containerNumber) {
    showValidationResult(false, "Please enter a container number", "")
    return
  }
  
  const validation = validateContainerNumber(containerNumber)
  
  if (validation.isValid) {
    showValidationResult(true, "Valid Container Number", 
      `Format: ✓ | Check Digit: ✓ | Owner Code: ${containerNumber.substring(0, 3)} | Category: ${containerNumber.charAt(3)}`)
  } else {
    showValidationResult(false, "Invalid Container Number", validation.error)
  }
}

const showValidationResult = (valid, message, details) => {
  isValid.value = valid
  resultMessage.value = message
  resultDetails.value = details
  showResult.value = true
}

// Reset form when component becomes inactive
watch(() => props.isActive, (newValue) => {
  if (!newValue) {
    containerInput.value = ''
    showResult.value = false
  }
})
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
<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-gray-900">FREITIT</NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</NuxtLink>
            <NuxtLink to="/tools" class="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium">Tools</NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <div class="min-h-screen flex flex-col justify-center items-center py-12 px-4">
      <div class="max-w-4xl w-full">
        <!-- Back to home link -->
        <div class="mb-8 text-center">
          <NuxtLink to="/" class="text-blue-500 hover:text-blue-700 text-sm font-medium">← Back to Home</NuxtLink>
        </div>

        <!-- Tools List View -->
        <div v-show="currentView === 'list'" class="tools-grid" :class="{ 'hidden': currentView !== 'list' }">
          <h2 class="text-4xl font-bold text-gray-900 text-center mb-4">Tools</h2>
          <p class="text-gray-600 text-center mb-12">Choose a tool to get started</p>
          
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Container Number Generator Card -->
            <div class="tool-card bg-white rounded-xl shadow-lg p-6 border" @click="showTool('generator')">
              <div class="text-emerald-500 mb-4">
                <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3 text-center">Container Number Generator</h3>
              <p class="text-gray-600 text-center text-sm mb-4">Generate valid container numbers with proper check digits for testing and development purposes.</p>
              <div class="flex justify-center">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  Generator
                </span>
              </div>
            </div>

            <!-- Container Number Checker Card -->
            <div class="tool-card bg-white rounded-xl shadow-lg p-6 border" @click="showTool('checker')">
              <div class="text-blue-500 mb-4">
                <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3 text-center">Container Number Checker</h3>
              <p class="text-gray-600 text-center text-sm mb-4">Validate container numbers by checking their format and verifying the check digit calculation.</p>
              <div class="flex justify-center">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Validator
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Container Number Generator Tool View -->
        <ContainerGenerator 
          v-show="currentView === 'generator'" 
          :class="{ 'active': currentView === 'generator' }"
          @back="showToolsList"
        />

        <!-- Container Number Checker Tool View -->
        <ContainerChecker 
          v-show="currentView === 'checker'" 
          :class="{ 'active': currentView === 'checker' }"
          @back="showToolsList"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Tools - FREITIT',
  meta: [
    { name: 'description', content: 'Container number tools and utilities' }
  ]
})

const currentView = ref('list')

const showTool = (toolName) => {
  currentView.value = toolName
}

const showToolsList = () => {
  currentView.value = 'list'
}
</script>
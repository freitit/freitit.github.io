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
            <NuxtLink to="/" class="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium">Home</NuxtLink>
            <NuxtLink to="/tools" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Tools</NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="min-h-screen flex flex-col justify-center items-center py-12 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-6xl font-bold text-gray-900 mb-8">
          Welcome to <span class="text-blue-500">FREITIT</span>
        </h1>
        
        <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Your collection of useful tools and utilities. Explore our tools to help with your daily tasks.
        </p>
        
        <!-- CTA Button -->
        <div class="space-y-4">
          <NuxtLink to="/tools" class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Explore Tools
          </NuxtLink>
        </div>
        
        <!-- Features Preview -->
        <div class="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="bg-white rounded-xl shadow-lg p-6 border">
            <div class="text-emerald-500 mb-4">
              <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Container Number Generator</h3>
            <p class="text-gray-600">Generate valid container numbers with proper check digits for testing and development purposes.</p>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6 border">
            <div class="text-blue-500 mb-4">
              <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Container Number Checker</h3>
            <p class="text-gray-600">Validate container numbers by checking their format and verifying the check digit calculation.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'FREITIT - Home',
  meta: [
    { name: 'description', content: 'Welcome to FREITIT Tools - Container number utilities and more' }
  ]
})
</script>
<script lang="ts">
  import { page } from '$app/stores';
  import { onMount, afterUpdate } from 'svelte';
  import { fade, fly, slide, scale } from 'svelte/transition';
  import { Loader, Send, Search, Globe, Brain, X, Trash, Download, Copy, Settings, Info, Image, ChevronDown, ChevronUp, Code, Sparkles, Wand2 } from '@lucide/svelte';
  import { marked } from 'marked';
  import { cubicOut, elasticOut } from 'svelte/easing';
  
  // Character name from URL parameter
  const charName = $page.params.char_name;
  
  // Message types
  type MessageRole = 'user' | 'assistant' | 'system';
  
  interface Message {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: Date;
    thinking?: boolean;
    sources?: Array<{
      title: string;
      url: string;
    }>;
  }
  
  // Chat state
  let messages: Message[] = [];
  let inputMessage = '';
  let isLoading = false;
  let isThinking = false;
  let chatContainer: HTMLElement;
  
  // Features state
  let webSearchEnabled = true;
  let showSidebar = window.innerWidth >= 768; // Default hidden on mobile
  let currentConversation = 'New Chat';
  let conversations = [
    { id: '1', title: 'New Chat', messages: [] },
    { id: '2', title: 'Anime Recommendations', messages: [] },
    { id: '3', title: 'Coding Help', messages: [] },
  ];
  
  // Tools dropdown state
  let showToolsDropdown = false;
  let selectedTool = 'default';
  let dropdownPosition = 'bottom'; // 'bottom' or 'top'
  let showToolsInInput = false; // State untuk menampilkan tools di dalam input area
  
  const tools = [
    { id: 'default', name: 'Default', icon: Brain },
    { id: 'web_search', name: 'Web Search', icon: Globe },
    { id: 'image_gen', name: 'Create Image', icon: Image },
    { id: 'code', name: 'Code Assistant', icon: Code },
    { id: 'creative', name: 'Creative Writing', icon: Sparkles },
  ];
  
  // Handle window resize for responsive sidebar
  function handleResize() {
    if (window.innerWidth < 768) {
      showSidebar = false;
    }
    
    // Cek ulang posisi dropdown jika sedang terbuka saat resize
    if (showToolsDropdown) {
      checkDropdownPosition();
    }
  }
  
  // Toggle tools dropdown
  function toggleToolsDropdown() {
    showToolsDropdown = !showToolsDropdown;
    
    if (showToolsDropdown) {
      // Cek posisi dropdown setelah render
      checkDropdownPosition();
    }
  }
  
  // Toggle tools in input area
  function toggleToolsInInput() {
    showToolsInInput = !showToolsInInput;
  }
  
  // Select tool
  function selectTool(toolId: string) {
    selectedTool = toolId;
    showToolsDropdown = false;
  }
  
  // Click outside directive for closing dropdowns
  function clickOutside(node: HTMLElement, { enabled = true, cb = () => {} } = {}) {
    const handleClick = (event: MouseEvent) => {
      if (!enabled) return;
      if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
        cb();
      }
    };
    
    document.addEventListener('click', handleClick, true);
    
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      },
      update(params: { enabled: boolean, cb: () => void }) {
        enabled = params.enabled;
        cb = params.cb;
      }
    };
  }
  
  // Mock function to simulate AI response
  async function sendMessage() {
    if (!inputMessage.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };
    
    messages = [...messages, userMessage];
    inputMessage = '';
    isLoading = true;
    isThinking = true;
    
    // Auto scroll to bottom
    setTimeout(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
    
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));
    isThinking = false;
    
    // Generate response based on selected tool
    let responseContent = '';
    let responseSources = undefined;
    
    switch (selectedTool) {
      case 'web_search':
        responseContent = `Berdasarkan pencarian web, ${generateResponse(userMessage.content)}`;
        responseSources = [
          { title: 'Example Source', url: 'https://example.com' },
          { title: 'Another Source', url: 'https://example.org' }
        ];
        break;
      case 'image_gen':
        responseContent = `Saya telah membuat gambar berdasarkan: "${userMessage.content}". [Gambar akan ditampilkan di sini]`;
        break;
      case 'code':
        responseContent = `**Berikut** kode untuk ${userMessage.content}:\n\n\`\`\`javascript\n// Contoh kode\nfunction example() {\n  console.log("Hello World");\n}\n\`\`\``;
        break;
      case 'creative':
        responseContent = `Tulisan kreatif tentang "${userMessage.content}":\n\n${generateResponse(userMessage.content)}`;
        break;
      default:
        responseContent = generateResponse(userMessage.content);
        responseSources = webSearchEnabled ? [
          { title: 'Example Source', url: 'https://example.com' },
          { title: 'Another Source', url: 'https://example.org' }
        ] : undefined;
    }
    
    // Add AI response
    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: responseContent,
      timestamp: new Date(),
      sources: responseSources
    };
    
    messages = [...messages, aiMessage];
    isLoading = false;
    
    // Auto scroll to bottom
    setTimeout(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
  }
  
  // Mock response generator
  function generateResponse(input: string): string {
    const responses = [
      `Sebagai asisten AI, saya dapat membantu Anda dengan pertanyaan tentang "${input}". Apakah ada hal spesifik yang ingin Anda ketahui?`,
      `Terima kasih atas pertanyaan Anda tentang "${input}". Berikut adalah beberapa informasi yang mungkin berguna...`,
      `"${input}" adalah topik yang menarik. Berdasarkan pengetahuan saya, saya dapat memberikan informasi berikut...`,
      `Saya telah mencari informasi tentang "${input}" dan menemukan beberapa sumber yang relevan. Menurut sumber-sumber tersebut...`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Format code blocks in messages
  function formatCodeBlocks(content: string): string {
    return marked(content) as string;
  }
  
  // Animasi untuk elemen UI
  function animateElement(node: HTMLElement) {
    return {
      duration: 400,
      css: (t: number) => {
        const eased = cubicOut(t);
        return `
          transform: scale(${0.8 + eased * 0.2});
          opacity: ${eased};
        `;
      }
    };
  }
  
  // Handle keyboard shortcuts
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
  
  // Clear chat
  function clearChat() {
    messages = [];
    currentConversation = 'New Chat';
  }
  
  // Create new chat
  function newChat() {
    messages = [];
    currentConversation = 'New Chat';
  }
  
  // Copy message to clipboard
  function copyMessage(content: string) {
    navigator.clipboard.writeText(content);
    // Could add a toast notification here
  }
  
  onMount(() => {
    // Add welcome message
    const welcomeMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `Halo! Saya adalah ${charName}, asisten AI Anda. Apa yang bisa saya bantu hari ini?`,
      timestamp: new Date()
    };
    
    messages = [welcomeMessage];
    
    // Add resize event listener for responsive design
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  
  // Fungsi untuk mengecek posisi dropdown
  function checkDropdownPosition() {
    setTimeout(() => {
      const toolsButton = document.querySelector('.tools-dropdown-button');
      const dropdown = document.querySelector('.tools-dropdown');
      
      if (toolsButton && dropdown) {
        const buttonRect = toolsButton.getBoundingClientRect();
        const dropdownHeight = (dropdown as HTMLElement).offsetHeight;
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - buttonRect.bottom;
        
        // Jika ruang di bawah tidak cukup untuk dropdown, tampilkan di atas
        dropdownPosition = spaceBelow < dropdownHeight + 10 ? 'top' : 'bottom';
      }
    }, 1_00);
  }
</script>

<svelte:head>
  <title>Chat dengan {charName} | Finime AI</title>
  <meta name="description" content="Chat dengan asisten AI {charName} di Finime" />
</svelte:head>

<div class="flex h-screen bg-[#000000] text-white overflow-hidden">
  <!-- Sidebar - Fixed position on mobile -->
  {#if showSidebar}
    <div class="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" on:click={() => showSidebar = false}></div>
    <aside class="fixed md:static w-64 h-full z-20 bg-[#111111] border-r border-[#333333] flex flex-col" transition:fly={{ x: -300, duration: 300 }}>
      <!-- New chat button -->
      <div class="p-4">
        <button 
          on:click={newChat}
          class="w-full bg-[#222222] hover:bg-[#333333] text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors duration-200">
          <span class="text-sm font-medium">+ New Chat</span>
        </button>
      </div>
      
      <!-- Conversations list -->
      <div class="flex-1 overflow-y-auto px-2 py-2">
        <h3 class="text-xs font-semibold text-[#888888] px-2 mb-2 uppercase">Recent Conversations</h3>
        <ul class="space-y-1">
          {#each conversations as conversation}
            <li>
              <button 
                class="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-[#222222] transition-colors duration-200 flex items-center gap-2 {currentConversation === conversation.title ? 'bg-[#222222] text-white' : 'text-[#BBBBBB]'}"
                on:click={() => currentConversation = conversation.title}>
                <span class="truncate">{conversation.title}</span>
              </button>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- User profile -->
      <div class="p-4 border-t border-[#333333]">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-purple-500 flex items-center justify-center">
            <span class="text-xs font-bold">FX</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium">Fahmi XD</p>
            <p class="text-xs text-[#888888]">Premium User</p>
          </div>
          <button class="text-[#888888] hover:text-white">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </aside>
  {/if}
  
  <!-- Main content -->
  <div class="flex-1 flex flex-col h-full overflow-hidden w-full {showSidebar ? 'md:ml-64' : ''}">  
    <!-- Header -->
    <header class="bg-[#111111] border-b border-[#333333] p-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- Toggle sidebar button -->
        <button 
          on:click={() => showSidebar = !showSidebar}
          class="p-2 rounded-md hover:bg-[#222222] text-[#888888] hover:text-white transition-colors duration-200">
          {#if showSidebar}
            <X size={18} />
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          {/if}
        </button>
        
        <h1 class="text-lg font-semibold">{charName}</h1>
      </div>
      
      <div class="flex items-center gap-2">
        <button 
          class="p-2 rounded-md hover:bg-[#222222] text-[#888888] hover:text-white transition-colors duration-200"
          title="Clear conversation"
          on:click={clearChat}>
          <Trash size={18} />
        </button>
        <button 
          class="p-2 rounded-md hover:bg-[#222222] text-[#888888] hover:text-white transition-colors duration-200"
          title="Information">
          <Info size={18} />
        </button>
      </div>
    </header>
    
    <!-- Chat container -->
    <div 
      bind:this={chatContainer}
      class="flex-1 overflow-y-auto py-4 px-4 md:px-8 lg:px-16 xl:px-32 bg-[#000000] scroll-smooth">
      {#each messages as message, i (message.id)}
        <div 
          class="mb-6 last:mb-4 max-w-3xl mx-auto group"
          in:fly|local={{ y: 30, duration: 400, delay: i * 100 }}
          out:fade|local={{ duration: 200 }}>
          <div class="flex items-start gap-4 {message.role === 'user' ? 'justify-end' : ''}">
            <!-- Avatar -->
            {#if message.role === 'assistant'}
              <div 
                class="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-red-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-glow-purple"
                in:scale|local={{ duration: 400, delay: i * 100, start: 0.5, opacity: 0, easing: elasticOut }}>
                <span class="text-xs font-bold">{charName[0].toUpperCase()}</span>
              </div>
            {/if}
            
            <!-- Message content -->
            <div 
              class="{message.role === 'user' ? 'bg-[#222222]' : 'bg-[#111111]'} rounded-lg p-4 max-w-[85%] shadow-md relative message-bubble"
              style="animation-delay: {i * 100}ms;">
              {#if message.thinking}
                <div class="flex items-center gap-2 text-[#888888]">
                  <Loader size={16} class="animate-spin" />
                  <span>Thinking...</span>
                </div>
              {:else}
                <div class="prose prose-invert max-w-none">
                  {#if message.content.includes('```')}
                    {@html formatCodeBlocks(message.content)}
                  {:else}
                    <p class="whitespace-pre-wrap">{message.content}</p>
                  {/if}
                </div>
                
                <!-- Sources if available -->
                {#if message.sources && message.sources.length > 0}
                  <div class="mt-3 pt-3 border-t border-[#333333]" in:slide|local={{ duration: 200, delay: 300 }}>
                    <p class="text-xs text-[#888888] mb-2 flex items-center gap-1">
                      <Globe size={12} />
                      <span>Sources:</span>
                    </p>
                    <ul class="space-y-1">
                      {#each message.sources as source, j}
                        <li in:fade|local={{ duration: 200, delay: 300 + j * 100 }}>
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="text-xs text-blue-400 hover:underline flex items-center gap-1">
                            <span>•</span>
                            <span>{source.title}</span>
                          </a>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
                
                <!-- Message actions -->
                <div class="mt-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                  <button 
                    on:click={() => copyMessage(message.content)}
                    class="p-1 text-[#888888] hover:text-white rounded-md hover:bg-[#222222] transition-all duration-200 hover:scale-110"
                    transition:scale|local={{ duration: 200 }}>
                    <Copy size={14} />
                  </button>
                </div>
              {/if}
            </div>
            
            <!-- User avatar -->
            {#if message.role === 'user'}
              <div 
                class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-glow-blue"
                in:scale|local={{ duration: 300, delay: i * 100, start: 0.5, opacity: 0, easing: elasticOut }}>
                <span class="text-xs font-bold">U</span>
              </div>
            {/if}
          </div>
        </div>
      {/each}
      
      <!-- Thinking indicator -->
      {#if isThinking}
        <div class="mb-6 max-w-3xl mx-auto" in:fade={{ duration: 300 }}>
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-red-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-glow-purple pulse-avatar"
                 in:scale|local={{ duration: 400, delay: 100, start: 0.5, opacity: 0, easing: elasticOut }}>
              <span class="text-xs font-bold">{charName[0].toUpperCase()}</span>
            </div>
            <div class="bg-[#111111] rounded-lg p-4 shadow-md thinking-bubble"
                 in:fly|local={{ y: 20, x: 5, duration: 500, delay: 200 }}>
              <div class="flex items-center gap-3 text-[#888888]">
                <div class="thinking-dots flex items-center justify-center">
                  <span class="dot dot-1"></span>
                  <span class="dot dot-2"></span>
                  <span class="dot dot-3"></span>
                </div>
                <span in:fade={{ delay: 400 }}>Thinking...</span>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
    
    <!-- Input area -->
    <div class="p-4 border-t border-[#333333] bg-[#111111]">
      <div class="max-w-3xl mx-auto" in:fade={{ duration: 300 }}>
        <!-- Tools selector dropdown -->
        <div class="relative input-container">
          <textarea
            bind:value={inputMessage}
            on:keydown={handleKeydown}
            placeholder="{selectedTool !== 'default' ? `${tools.find(t => t.id === selectedTool)?.name}: ` : ''}Kirim pesan ke {charName}..."
            rows="1"
            class="w-full bg-[#222222] text-white rounded-lg py-3 pl-4 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-[#444444] placeholder-[#888888] shadow-md transition-shadow duration-300 {showToolsInInput ? 'rounded-b-none' : ''}"
            style="min-height: 56px; max-height: 200px;"
          ></textarea>
          
          <div class="absolute right-3 bottom-3 flex items-center gap-2">
            <!-- Tools button -->
            <button 
              on:click={toggleToolsInInput}
              class="p-1.5 rounded-md {showToolsInInput ? 'text-purple-400 bg-purple-400/10' : 'text-[#888888] hover:text-white hover:bg-[#333333]'} transition-all duration-200 hover:scale-110"
              title="Show tools"
              transition:animateElement>
              <Wand2 size={16} />
            </button>
            
            <!-- Web search toggle -->
            <button 
              on:click={() => webSearchEnabled = !webSearchEnabled}
              class="p-1.5 rounded-md {webSearchEnabled ? 'text-blue-400 bg-blue-400/10' : 'text-[#888888] hover:text-white hover:bg-[#333333]'} transition-all duration-200 hover:scale-110"
              title="{webSearchEnabled ? 'Disable web search' : 'Enable web search'}"
              transition:animateElement>
              <Globe size={16} />
            </button>
            
            <!-- Send button -->
            <button 
              on:click={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              class="p-1.5 rounded-md {inputMessage.trim() && !isLoading ? 'bg-red-600 text-white' : 'bg-[#333333] text-[#888888]'} transition-all duration-200 hover:scale-110 {inputMessage.trim() && !isLoading ? 'hover:bg-red-700' : ''}"
              transition:animateElement>
              {#if isLoading}
                <Loader size={16} class="animate-spin" />
              {:else}
                <Send size={16} />
              {/if}
            </button>
          </div>
          
          <!-- Tools panel inside input area -->
          <!-- {#if showToolsInInput}
            <div 
              class="tools-panel w-full bg-[#1a1a1a] border-x border-b border-[#333333] rounded-b-lg shadow-lg overflow-hidden"
              transition:slide|local={{ duration: 200, easing: cubicOut }}>
              <div class="p-2 grid grid-cols-5 gap-1">
                {#each tools as tool, i}
                  <button 
                    on:click={() => { selectTool(tool.id); showToolsInInput = false; }}
                    class="flex flex-col items-center justify-center p-2 rounded-md hover:bg-[#333333] transition-all duration-200 {selectedTool === tool.id ? 'bg-[#333333] text-white ring-1 ring-purple-500' : 'text-[#bbbbbb]'}"
                    in:scale|local={{ duration: 200, delay: 100 + i * 50 }}>
                    <div class="w-8 h-8 rounded-full {selectedTool === tool.id ? 'bg-purple-500/20' : 'bg-[#222222]'} flex items-center justify-center mb-1 transition-all duration-300">
                      <svelte:component this={tool.icon} size={16} class="{selectedTool === tool.id ? 'text-purple-400' : ''}" />
                    </div>
                    <span class="text-xs">{tool.name}</span>
                  </button>
                {/each}
              </div>
            </div>
          {/if} -->
        </div>
        
        <!-- Tools selector dropdown di bawah textarea -->
        <div class="mt-2 relative flex justify-between items-center">
          <p class="text-xs text-[#888888] text-center flex-1">
            {charName} dapat memberikan informasi yang tidak akurat. Pertimbangkan untuk memeriksa fakta penting.  
          </p>
          
          <div class="relative">
            <button 
              on:click={toggleToolsDropdown}
              class="tools-dropdown-button flex items-center gap-2 text-sm py-1.5 px-3 rounded-md bg-[#222222] hover:bg-[#333333] transition-colors duration-200 shadow-sm"
              transition:animateElement>
              <svelte:component this={tools.find(t => t.id === selectedTool)?.icon} size={16} class="text-blue-400" />
              <span>{tools.find(t => t.id === selectedTool)?.name}</span>
              <div class="ml-auto opacity-70">
                {#if showToolsDropdown}
                  <ChevronUp size={14} />
                {:else}
                  <ChevronDown size={14} />
                {/if}
              </div>
            </button>
            
            {#if showToolsDropdown}
              <div 
                class="tools-dropdown absolute {dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'} right-0 w-48 bg-[#222222] border border-[#333333] rounded-md shadow-lg z-10"
                transition:slide={{ duration: 200, easing: cubicOut }}
                use:clickOutside={{ enabled: showToolsDropdown, cb: () => showToolsDropdown = false }}>
                <ul class="py-1">
                  {#each tools as tool, i}
                    <li
                      in:scale|local={{ duration: 200, delay: i * 50 }}>
                      <button 
                        on:click={() => selectTool(tool.id)}
                        class="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-[#333333] transition-colors duration-200 {selectedTool === tool.id ? 'bg-[#333333] text-white' : 'text-[#bbbbbb]'}">
                        <div class="w-5 h-5 flex items-center justify-center">
                          <svelte:component this={tool.icon} size={16} class="{selectedTool === tool.id ? 'text-blue-400' : ''}" />
                        </div>
                        <span>{tool.name}</span>
                        {#if selectedTool === tool.id}
                          <div class="ml-auto w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center" transition:scale={{ duration: 200 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                        {/if}
                      </button>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #111111;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #333333;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #444444;
  }
  
  /* Auto-resize textarea */
  textarea {
    overflow-y: hidden;
  }
  
  /* Ensure the chat container takes up available space */
  .prose p {
    margin-top: 0;
    margin-bottom: 0;
  }
  
  /* Code block styling */
  .prose pre {
    background-color: #1a1a1a;
    border-radius: 6px;
    padding: 1rem;
    margin: 0.5rem 0;
    overflow-x: auto;
  }
  
  .prose code {
    background-color: #2a2a2a;
    border-radius: 3px;
    padding: 0.2rem 0.4rem;
    font-family: monospace;
  }
  
  .prose pre code {
    background-color: transparent;
    padding: 0;
    color: #e0e0e0;
  }
  
  /* Thinking animation */
  .thinking-dots {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  
  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #888888;
    opacity: 0.6;
  }
  
  .dot-1 {
    animation: pulse 1.5s infinite ease-in-out;
  }
  
  .dot-2 {
    animation: pulse 1.5s infinite ease-in-out 0.2s;
  }
  
  .dot-3 {
    animation: pulse 1.5s infinite ease-in-out 0.4s;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.4;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.5);
    }
  }
  
  .thinking-bubble {
    position: relative;
    animation: breathe 2s infinite ease-in-out;
  }
  
  @keyframes breathe {
    0%, 100% {
      box-shadow: 0 0 5px rgba(168, 85, 247, 0.2);
    }
    50% {
      box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
    }
  }
  
  .pulse-avatar {
    animation: pulse-glow 2s infinite ease-in-out;
  }
  
  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
      transform: scale(1.05);
    }
  }
  
  /* Message styling */
  .message-bubble {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .message-bubble:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0; }
    70% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
  
  .shadow-glow-purple {
    box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
  }
  
  .shadow-glow-blue {
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
  }
  
  /* Input styling */
  .input-container textarea:focus {
    box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .input-container {
    animation: slideUp 0.5s ease-out forwards;
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  .tools-panel {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  
  /* Fix for mobile responsiveness */
  @media (max-width: 640px) {
    .prose {
      font-size: 0.9rem;
    }
    
    .prose pre {
      padding: 0.75rem;
    }
  }
</style>
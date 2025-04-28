'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { useUser } from '@/lib/UserContext';
import { Message } from '@/components/ai-chat/types';
import { MobileChat } from '@/components/ai-chat/mobile-chat';
import { DesktopChat } from '@/components/ai-chat/desktop-chat';

// Helper function to generate unique IDs
const generateUniqueId = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const { username } = useUser();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: username
        ? `Hello, **${username}**! 👋 I am BOB, your whisky expert. How can I help you today?`
        : `Hello! 👋 I am BOB, your whisky expert.

 I noticed you're not registered with BoozApp yet. For personalized whisky recommendations, please create an account.

How can I help you today?`,
      role: 'assistant',
    },
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // For responsive design - detect mobile
  const [isMobile, setIsMobile] = useState(false);

  const [customIsLoading, setCustomIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;
  const lastInputRef = useRef<string>('');
  const streamingMessageIdRef = useRef<string | null>(null);
  const isStreamingRef = useRef<boolean>(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const {
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
    completion,
  } = useCompletion({
    api: `/api/chat`,
    streamProtocol: 'text',
    body: (input: string) => ({
      prompt: input,
      conversationHistory: messages.map(({ content, role }) => ({
        content,
        role,
      })),
      // Pass user context to the API
      userContext: {
        username: username || undefined,
        isRegistered: !!username,
      },
    }),
    onResponse: (response) => {
      console.log('API Response Status:', response.status);
      if (!response.ok) {
        console.error('Error in API response:', response);
      }
    },
    onFinish: (completionText) => {
      console.log('Received completion:', completionText);
      try {
        // Reset error and retry count on successful completion
        setRetryCount(0);

        // The streaming message is already in the messages array and has been
        // updated via onTextContent, so we don't need to add it again
        streamingMessageIdRef.current = null;
        isStreamingRef.current = false;
        setInput('');
        setCustomIsLoading(false);
      } catch (err) {
        console.error('Error handling completion:', err);
        setCustomIsLoading(false);
      }
    },
    onError: (error) => {
      console.error('Completion error:', error);

      // Clean up streaming message if it exists
      if (streamingMessageIdRef.current) {
        setMessages((prev) =>
          prev.filter((message) => message.id !== streamingMessageIdRef.current)
        );
        streamingMessageIdRef.current = null;
        isStreamingRef.current = false;
      }

      // Implement retry logic
      if (retryCount < maxRetries) {
        console.log(`Retrying request (${retryCount + 1}/${maxRetries})...`);
        setRetryCount((prev) => prev + 1);
        // Retry the submission after a short delay
        setTimeout(() => {
          // Use the saved input for retry
          const savedInput = lastInputRef.current;
          if (savedInput) {
            // Manually trigger completion with the saved input
            setInput(savedInput);
            handleSubmit(
              new Event('submit') as {
                preventDefault: () => void;
              }
            );
          }
        }, 1000);
      } else {
        // Add error message to chat after max retries
        const errorMessage = {
          id: generateUniqueId(),
          content: "Sorry, I couldn't process your request. Please try again.",
          role: 'assistant' as const,
        };
        setMessages((prev) => [...prev, errorMessage]);
        setRetryCount(0);
        setCustomIsLoading(false);
      }
    },
  });

  // Create handlers for the streaming functionality
  const handleStreamStart = () => {
    // Don't create a new streaming message if one already exists
    if (isStreamingRef.current) return;

    // Create a placeholder message for streaming
    const streamingMessageId = generateUniqueId();
    streamingMessageIdRef.current = streamingMessageId;
    isStreamingRef.current = true;

    const placeholderMessage: Message = {
      id: streamingMessageId,
      content: '',
      role: 'assistant',
    };

    setMessages((prev) => [...prev, placeholderMessage]);
  };

  const handleStreamContent = (content: string, completion: string) => {
    // Update the current streaming message with new content
    if (streamingMessageIdRef.current) {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === streamingMessageIdRef.current
            ? { ...message, content: completion }
            : message
        )
      );
    }
  };

  // Set up side effect to handle streaming
  useEffect(() => {
    // When completion updates, update the streaming message
    if (completion && streamingMessageIdRef.current) {
      handleStreamContent('', completion);
    }
  }, [completion]);

  // Monitor completion changes for debugging
  useEffect(() => {
    console.log('Completion updated:', completion);
  }, [completion]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Reset error state
    setRetryCount(0);
    setCustomIsLoading(true);

    // Save the current input for potential retries
    lastInputRef.current = input;

    // Add user message with unique ID
    const userMessage = {
      id: generateUniqueId(),
      content: input,
      role: 'user' as const,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Check for registration responses
    const lowercaseInput = input.toLowerCase();
    if (
      lowercaseInput.includes('yes') ||
      lowercaseInput.includes('sure') ||
      lowercaseInput.includes('register') ||
      lowercaseInput.includes('sign up')
    ) {
      // Handle registration intent
      window.open(
        `https://baxus.co/login?utm_source=baxus-bob.maikers.com&utm_medium=recommendation&utm_campaign=superteam-earn-chainsona`,
        '_blank'
      );
    }

    // Create placeholder message and then process submission
    handleStreamStart();
    handleSubmit(e);
  };

  return (
    <>
      {isMobile ? (
        <MobileChat
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          messages={messages}
          input={input}
          isLoading={customIsLoading || isLoading}
          username={username}
          onInputChange={handleInputChange}
          onSubmit={onSubmit}
          scrollAreaRef={scrollAreaRef}
        />
      ) : (
        <DesktopChat
          isOpen={isOpen}
          toggleChat={toggleChat}
          messages={messages}
          input={input}
          isLoading={customIsLoading || isLoading}
          username={username}
          onInputChange={handleInputChange}
          onSubmit={onSubmit}
          scrollAreaRef={scrollAreaRef}
        />
      )}
    </>
  );
}

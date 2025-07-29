import React, { useState } from 'react';
import './PromptForm.css';

const toneOptions = [
  'Formal', 'Informal', 'Professional', 'Conversational', 'Friendly', 'Witty', 'Funny', 'Serious', 'Sincere', 'Compassionate', 'Empathetic', 'Inspiring', 'Motivational', 'Authoritative', 'Persuasive', 'Calm', 'Reassuring', 'Excited', 'Energetic', 'Dramatic', 'Neutral', 'Objective', 'Analytical', 'Instructive', 'Explanatory', 'Academic', 'Corporate', 'Creative', 'Poetic', 'Romantic', 'Mysterious', 'Storytelling', 'Urgent', 'Casual', 'Playful', 'Bold', 'Direct', 'Warm', 'Thoughtful'
];

const formConfigs = {
  'LinkedIn Ads': {
    questions: [
      'What is the product or service being advertised?',
      'What is the target audience for this ad?',
      'What is the call-to-action for this ad?',
      'What tone of voice should the ad use?',
      'What are the top 3 features or benefits of the product/service?'
    ],
    examples: ['', '', '', 'Friendly', ''],
    template: 'Write an attention-grabbing LinkedIn ad for the product or service {1}, targeted at the audience of {2}. The ad should adopt a {4} tone of voice and highlight the top 3 features or benefits: {5}. Make sure to include the call-to-action {3} to encourage viewers to take the desired action.',
    tones: toneOptions,
  },
  'Facebook Ads': {
    questions: [
      'What is the product or service being advertised?',
      'What is the target audience for this ad?',
      'What is the call-to-action for this ad?',
      'What tone of voice should the ad use?',
      'What are the top 3 features or benefits of the product/service?'
    ],
    examples: ['', '', '', 'Friendly', ''],
    template: 'Write an attention-grabbing Facebook ad for the product or service {1}, targeted at the audience of {2}. The ad should adopt a {4} tone of voice and highlight the top 3 features or benefits: {5}. Make sure to include the call-to-action {3} to encourage viewers to take the desired action.',
    tones: toneOptions,
  },
  'Google Ads': {
    questions: [
      'What is the product or service being advertised?',
      'What is the target audience for this ad?',
      'What is the call-to-action for this ad?',
      'What tone of voice should the ad use?',
      'What are the top 3 features or benefits of the product/service?'
    ],
    examples: ['', '', '', 'Friendly', ''],
    template: 'Write an attention-grabbing Google ad for the product or service {1}, targeted at the audience of {2}. The ad should adopt a {4} tone of voice and highlight the top 3 features or benefits: {5}. Make sure to include the call-to-action {3} to encourage viewers to take the desired action.',
    tones: toneOptions,
  },
  'General Advertisement': {
    questions: [
      'What is the product or service being advertised?',
      'What is the target audience for this ad?',
      'What is the call-to-action for this ad?',
      'What tone of voice should the ad use?',
      'What are the top 3 features or benefits of the product/service?'
    ],
    examples: ['', '', '', 'Friendly', ''],
    template: 'Write an attention-grabbing advertisement for the product or service {1}, targeted at the audience of {2}. The ad should adopt a {4} tone of voice and highlight the top 3 features or benefits: {5}. Make sure to include the call-to-action {3} to encourage viewers to take the desired action.',
    tones: toneOptions,
  },
  'App and SMS Notifications': {
    questions: [
      'What is the app or service?',
      'What is the notification purpose?',
      'What is the target audience?',
      'What tone should the notification use?',
      'What is the call-to-action?'
    ],
    examples: ['', '', '', 'Friendly', ''],
    template: 'Write an engaging {2} notification for {1} app, targeted at {3}. The notification should use a {4} tone and include a clear call-to-action: {5}.',
    tones: toneOptions,
  },
  'Blog/Article Titles': {
    questions: [
      'What is the main topic?',
      'How many titles to generate?'
    ],
    examples: ['online marketing', '10'],
    template: 'Generate a list of {2} creative and captivating blog/article titles related to the main topic of {1}. Make sure the titles are engaging, thought-provoking, and tailored to attract the target audience\'s interest. Each title should reflect a unique aspect or perspective of the main topic, offering diverse content ideas for readers to explore.',
    numberQuestionIndex: 1
  },
  'Paragraph Script': {
    questions: [
      'What is the topic?',
      'Tone of voice?',
      'Keywords you want to rank for. (separated by commas):',
      'How many words?'
    ],
    examples: [
      'Example: SEO is important for high rankings', 'Casual', 'Example: ranking websites, best seo services', 'Example: 400'
    ],
    template: 'Write a {4}-word paragraph on the topic of {1} in a {2} tone of voice. Make sure to incorporate the following keywords to improve SEO ranking: {3}. The paragraph should present a clear and engaging idea or argument, supported by relevant facts, examples, or anecdotes. Seamlessly integrate the keywords into the paragraph without compromising the natural flow and readability of the content.',
    tones: toneOptions,
    toneQuestionIndex: 1, // index of the tone of voice question
    numberQuestionIndex: 3 // index of the number input
  },
  'Blog/Article Ideas': {
    questions: [
      'What is the main topic?',
      'What is the target audience?',
      'How many blog/article ideas would you like to generate?'
    ],
    examples: ['Email marketing', 'Small business owners', '5'],
    template: 'Generate a list of {3} unique and engaging blog/article ideas related to the main topic of {1} specifically tailored for the target audience of {2}. These ideas should be designed to generate traffic, leads, and sales by providing valuable information and insights to the readers. Each idea should cover a different aspect or angle of the main topic to offer a variety of content for readers to explore.',
    numberQuestionIndex: 2
  },
  'BLOG/ARTICLE INTRO': {
    questions: [
      'What is the title or main topic of your blog/article?',
      'Who is your target audience?',
      'What tone do you want for the introduction?'
    ],
    examples: [
      'Example: The Power of Mindfulness in Everyday Life',
      'Example: busy professionals, students',
      'Example: casual, confident'
    ],
    template: 'Write an engaging introduction for a blog or article titled {1}, aimed at {2}. The introduction should be written in a {3} tone, capturing the reader\'s attention and providing a compelling reason to continue reading.'
  },
  'Blog/Article Outlines': {
    questions: [
      'What is the main topic?',
      'What is the target audience?',
      'How many blog/article outlines would you like to generate?'
    ],
    examples: ['Email marketing', 'Small business owners', '5'],
    template: 'Generate a list of {3} detailed blog/article outlines related to the main topic of {1} specifically tailored for the target audience of {2}. Each outline should include a compelling headline, introduction, main points with subheadings, and a conclusion. These outlines should be designed to generate traffic, leads, and sales by providing valuable information and insights to the readers.',
    numberQuestionIndex: 2
  },
  'Short Blog/Article': {
    questions: [
      'What is the main topic?',
      'What is the target audience?',
      'What tone of voice should the article use?',
      'How many words should the article be?'
    ],
    examples: ['Email marketing tips', 'Small business owners', 'Professional', '500'],
    template: 'Write a {4}-word blog/article on the topic of {1} targeted at {2} in a {3} tone. The article should be engaging, informative, and provide valuable insights that readers can immediately apply.',
    tones: toneOptions,
    toneQuestionIndex: 2,
    numberQuestionIndex: 3
  },
  'Guarantees': {
    questions: [
      'What is the product or service?',
      'What is the guarantee type?',
      'What is the guarantee duration?',
      'What is the guarantee coverage?'
    ],
    examples: ['Online course', 'Money-back guarantee', '30 days', 'Full refund'],
    template: 'Write a compelling guarantee for {1} that offers a {2} with {3} duration. The guarantee should cover {4} and be designed to build trust and confidence with potential customers.',
    numberQuestionIndex: 2
  },
  'COMPANY BIO': {
    questions: [
      'What is the name of the company?',
      'What is the company\'s main industry or focus?',
      'In what year was the company founded?',
      'What is the company\'s mission or purpose?',
      'What is the target market or audience?'
    ],
    examples: [
      'Example: TechDynamics',
      'Example: software development',
      'Example: 2005',
      'Example: providing innovative software solutions',
      'Example: global clientele'
    ],
    template: 'Write an engaging company bio for {1}, a {2} company founded in {3}. The bio should highlight the company\'s mission, which is {4}, and be tailored to resonate with their target market, {5}. Craft a narrative that showcases the company\'s achievements, values, and unique selling points in a captivating and relatable manner.'
  },
  'CONCLUSION SCRIPT': {
    questions: [
      'Enter content you would like a conclusion about:'
    ],
    examples: [
      'Example: The importance of teamwork in business'
    ],
    template: 'Write a powerful conclusion based on the content provided: {1}. The conclusion should summarize the key takeaways or benefits, and if applicable, create a compelling call-to-action encouraging the reader to take further steps related to the topic.'
  },
  'LINKEDIN POST': {
    questions: [
      'What is the main topic of the LinkedIn post?',
      'Who is the target audience for the post?',
      'What is the purpose of the post?',
      'What tone of voice should the post have?',
      'Suggest an eye-catching title or headline for the post.'
    ],
    examples: [
      'Example: recent trends in AI',
      'Example: tech professionals, data scientists',
      'Example: informative, educational',
      'casual',
      'Example: AI in 2023: What to Expect'
    ],
    template: 'Write an engaging LinkedIn post on the topic of {1} targeted at the audience of {2}. The post should adopt a {4} tone of voice and align with the {3} purpose. Use the eye-catching title or headline {5} to grab the attention of your audience and encourage them to engage with your post.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'INSTAGRAM CAPTION': {
    questions: [
      'What is the main subject or theme of the instagram photo?',
      'Who is the target audience for the caption?',
      'What tone of voice should the caption have?',
      'Suggest relevant hashtags to include with the caption.'
    ],
    examples: [
      'Example: a beach vacation',
      'Example: travel enthusiasts, adventure seekers',
      'casual',
      'Example: #beachvibes #wanderlust'
    ],
    template: 'Write an engaging Instagram caption for a photo with the main subject or theme of {1}, targeted at the audience of {2}. The caption should adopt a {3} tone of voice. Make sure to include the relevant hashtags {4} to increase the post\'s visibility and engagement.',
    tones: toneOptions,
    toneQuestionIndex: 2
  },
  'INSTAGRAM REELS': {
    questions: [
      'What is the main topic or theme of the Instagram Reel?',
      'How many seconds should the Reel be?',
      'Describe the visual content or actions you want in the Reel.'
    ],
    examples: [
      'Example: Fashion tips',
      'Example: 5',
      'Example: show a quick change from casual to evening wear'
    ],
    template: 'Create an Instagram Reel of {2} seconds on the topic of {1}. It should feature {3}. The reel should be engaging and catchy, perfectly suited for social media scrolling.'
  },
  'TWITTER TWEET': {
    questions: [
      'What is the main topic or theme of the tweet?',
      'Who is the target audience for the tweet?',
      'What tone of voice should the tweet have?',
      'Suggest relevant hashtags to include with the tweet.'
    ],
    examples: [
      'Example: digital marketing trends',
      'Example: marketers, entrepreneurs',
      'casual',
      'Example: #digitalmarketing #trend'
    ],
    template: 'Write an engaging and attention-grabbing tweet on the topic or theme of {1}, targeted at the audience of {2}. The tweet should adopt a {3} tone of voice. Make sure to include the relevant hashtags {4} to increase the post\'s visibility and engagement on Twitter.',
    tones: toneOptions,
    toneQuestionIndex: 2
  },
  'TWITTER SERIES': {
    questions: [
      'What is the main topic or theme of tweet series?',
      'Who is the target audience for the tweet series?',
      'How many tweets do you want in the series?',
      'What tone of voice should the tweet series have?',
      'Suggest relevant hashtags to include with the tweet series.'
    ],
    examples: [
      'Example: SEO techniques',
      'Example: SEO professionals, digital marketers',
      'Example: 5',
      'Encouraging',
      'Example: #SEO #DigitalMarketing'
    ],
    template: 'Create a series of {3} engaging and attention-grabbing tweets on the topic or theme of {1}, targeted at the audience of {2}. The tweet series should adopt a {4} tone of voice. Make sure to include the relevant hashtags {5} to increase the post\'s visibility and engagement on Twitter. The series should be interconnected and create a sense of continuity to keep readers engaged and eager to read the next tweet in the series.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'TRENDING INSTAGRAM HASHTAGS': {
    questions: [
      'What are the main topics or themes you want the hashtags to be related to?',
      'How many trending hashtags do you want to generate?'
    ],
    examples: [
      'Example: travel, adventure',
      'Example: 10'
    ],
    template: 'Generate a list of {2} trending Instagram hashtags related to the main topics or themes of {1}. The hashtags should be popular, relevant, and have the potential to attract a wider audience and boost engagement on Instagram posts featuring those topics or themes.'
  },
  'TRENDING TWITTER HASHTAGS': {
    questions: [
      'What are the main topics or themes you want the hashtags to be related to?',
      'How many trending hashtags do you want to generate?'
    ],
    examples: [
      'Example: technology, innovation',
      'Example: 10'
    ],
    template: 'Generate a list of {2} trending Twitter hashtags related to the main topics or themes of {1}. The hashtags should be popular, relevant, and have the potential to attract a wider audience and boost engagement on Twitter posts featuring those topics or themes.'
  },
  'PINTEREST PIN TITLE AND DESCRIPTION': {
    questions: [
      'What is the main topic or theme of the Pinterest pin?',
      'What is the target audience?',
      'What tone of voice do you want to use for the title and description?'
    ],
    examples: [
      'Example: DIY home decor',
      'Example: crafters and DIY enthusiasts',
      'casual'
    ],
    template: 'Create a captivating Pinterest pin title and description for the topic {1} targeted at the audience of {2}. Adopt a {3} tone of voice and ensure the title and description are engaging, informative, and designed to encourage clicks, saves, and shares from Pinterest users interested in the main topic or theme.',
    tones: toneOptions,
    toneQuestionIndex: 2
  },
  'QUORA ANSWERS': {
    questions: [
      'What is the Quora question you want to answer?',
      'What is the target audience for your answer?',
      'What is the purpose of your answer?',
      'What tone of voice do you want to use for the answer?'
    ],
    examples: [
      'Example: What are the best content marketing strategies for small businesses?',
      'Example: small business owners and marketers',
      'Example: informative, educational',
      'casual'
    ],
    template: 'Write a thoughtful and engaging Quora answer to the question {1} targeted at the audience of {2}. The answer should adopt a {4} tone of voice and align with the {3} purpose. Make sure your response is informative, well-researched, and adds value to the discussion, positioning you as a knowledgeable and helpful contributor in the Quora community.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'PERSONAL BIO': {
    questions: [
      'What is your full name?',
      'What is your current job title or profession?',
      'How many years of experience do you have in your field?',
      'What are your areas of expertise or key skills?',
      'What is your personal or professional mission statement?',
      'What tone of voice do you want for your bio?'
    ],
    examples: [
      'Example: Jane Smith',
      'Example: content marketing specialist',
      'Example: 10 years',
      'Example: digital marketing, content creation, SEO',
      'Example: helping businesses grow through engaging content',
      'casual'
    ],
    template: 'Write a captivating personal bio for {1}, a {2} with {3} of experience in the field. The bio should highlight their expertise in {4} and emphasize their mission statement of {5}. Adopt a {6} tone of voice to make the bio stand out and leave a memorable impression on the reader.',
    tones: toneOptions,
    toneQuestionIndex: 5
  },
  'LONG SALES COPY': {
    questions: [
      'What is the product or service being sold?',
      'What is the target audience?',
      'What are the top 3 benefits of the product or service?',
      'What is the unique selling proposition (USP)?',
      'Tone of voice?'
    ],
    examples: [
      'Example: online course on personal branding',
      'Example: entrepreneurs and professionals',
      'Example: improved online presence, increased career opportunities, personal brand growth',
      'Example: step-by-step guidance from industry experts',
      'casual'
    ],
    template: 'Write a long-form sales copy for the {1} targeted at {2}. The sales copy should emphasize the top 3 benefits of the product or service: {3} and highlight the unique selling proposition: {4}. Adopt a {5} tone of voice throughout the copy to engage the readers and encourage them to take action by purchasing the product or service. The sales copy should be persuasive, informative, and create a sense of urgency that drives the readers towards the order button.',
    tones: toneOptions,
    toneQuestionIndex: 4
  },
  'SHORT SALES COPY': {
    questions: [
      'What is the name of the product or service you are promoting?',
      'What is the unique selling proposition (USP) of the product or service?',
      'Who is the target audience?',
      'What tone of voice should the copy have?',
      'What is the call to action (CTA) or desired outcome?'
    ],
    examples: [
      'Example: Superclean 3000',
      'Example: a revolutionary cleaning product',
      'Example: homeowners and cleaning professionals',
      'casual',
      'Example: an exclusive discount for a limited time'
    ],
    template: 'Write a short, compelling sales copy for the {1}, which is {2}. The copy should target {3} and adopt a {4} tone of voice. Make sure to include a call to action, such as {5}, to encourage potential customers to take action and make a purchase.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'OPTIN PAGES': {
    questions: [
      'What is the name of the offer or incentive for signing up?',
      'What is the format of the offer (e.g. eBook, webinar, newsletter)?',
      'Who is the target audience?',
      'What tone of voice should the copy have?',
      'What is the call to action (CTA) or desired outcome?'
    ],
    examples: [
      'Example: Email Marketing Mastery',
      'Example: a free eBook',
      'Example: digital marketers and small business owners',
      'casual',
      'Example: Sign up now for instant access'
    ],
    template: 'Write persuasive opt-in page copy for the {1}, which is {2}. The copy should target {3} and adopt a {4} tone of voice. Clearly outline the benefits of signing up for the offer and include a strong call to action, such as {5}, to encourage potential leads to take action and sign up.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'CALL TO ACTIONS': {
    questions: [
      'What is the desired action for the user to take?',
      'What is the benefit or value of taking the action?',
      'What tone should the call to action have?',
      'Is there a time-sensitive aspect or urgency to the call to action?'
    ],
    examples: [
      'Example: eBook download',
      'Example: Email marketing tips for small businesses',
      'casual',
      'Example: limited time offer'
    ],
    template: 'Write a compelling call to action for users to {1}. Highlight the benefit or value of {2} and adopt a {3} tone. If applicable, include a sense of urgency like {4} to encourage users to take action promptly.',
    tones: toneOptions,
    toneQuestionIndex: 2
  },
  'FEATURE/BENEFIT LIST': {
    questions: [
      'What is the product or service?',
      'How many features/benefits do you want to highlight?',
      'List the features you want to highlight (separated by commas):',
      'List the corresponding benefits for each feature (separated by commas):'
    ],
    examples: [
      'Example: online project management tool',
      'Example: 5',
      'Example: time tracking, task management, team collaboration',
      'Example: save time, improve organization, enhance communication'
    ],
    template: 'Create a feature/benefit list for the {1} product or service, highlighting {2} key features and their corresponding benefits. The features to be highlighted are {3} and the respective benefits are {4}. Craft a compelling and persuasive list that showcases the advantages of using the product or service, making it irresistible to potential customers.'
  },
  'HEADLINES': {
    questions: [
      'What is the product or service?',
      'Who is the target audience?',
      'What type of headline style do you prefer?'
    ],
    examples: [
      'Example: Online language learning platform',
      'Example: language learners, students, professionals',
      'Example: Informative'
    ],
    template: 'Create a headline for the {1} that captures the attention of the target audience, which includes {2}. The headline should be in a {3} style, making it unique, engaging, and persuasive, encouraging potential customers to learn more about the product or service.'
  },
  'SUBHEADLINES': {
    questions: [
      'What is the product or service?',
      'Who is the target audience?',
      'How many subheadline styles do you need?',
      'What type of subheadline style do you prefer?'
    ],
    examples: [
      'Example: a new fitness app',
      'Example: fitness enthusiasts, athletes, beginners',
      'Example: 5',
      'Example: Informative'
    ],
    template: 'Create {3} subheadlines for the {1} that cater to the target audience, which includes {2}. The subheadlines should be in a {4} style, making them engaging and persuasive, encouraging readers to dive deeper into the content and explore the product or service further.'
  },
  'UNIQUE VALUE PROPOSITION': {
    questions: [
      "What is the name of the company, product, or service?",
      "What is the company, product, or service's main industry or focus?",
      "What is the main benefit or feature of the product or service?",
      "What makes the product or service unique or stand out from competitors?",
      "What is the target market or audience?"
    ],
    examples: [
      'Example: TechDynamics',
      'Example: software development',
      'Example: Providing innovative software solutions',
      'Example: time-saving automation',
      'Example: small businesses and startups'
    ],
    template: 'Write a clear and potent unique value proposition for {1}, a {2} company, product, or service. Highlight the main benefit, {3}, and what sets it apart from the competition, {4}. Ensure the statement is tailored to resonate with the target market or audience, {5}. Craft a memorable and impactful message that showcases the true value of the offering.'
  },
  'FAQ GENERATOR': {
    questions: [
      'What is the main topic or subject the FAQs will address?',
      'How many FAQs would you like to generate?',
      'What is the target audience or market for the FAQs?',
      'What is the purpose of the FAQs?',
      'What tone of voice should the FAQs adopt?'
    ],
    examples: [
      'Example: smart home security systems',
      'Example: 5',
      'Example: homeowners',
      'Example: Informative, Educational',
      'Example: casual, confident'
    ],
    template: 'Generate {2} FAQs about {1} tailored to the target audience, {3}. The FAQs should serve the {4} purpose and adopt a {5} tone of voice. Make sure the questions and answers address common concerns, misconceptions, or points of interest related to the main topic, ensuring the content is engaging, informative, and helpful to the target audience.',
    tones: toneOptions,
    toneQuestionIndex: 4
  },
  'PRODUCT DESCRIPTION': {
    questions: [
      'What is the product?',
      'What is the target audience for the product?',
      'What are the key features or benefits of the product?',
      'What tone of voice should the product description adopt?',
      'What is the desired word count for the product description?'
    ],
    examples: [
      'Example: wireless noise-cancelling headphones',
      'Example: music enthusiasts, remote workers, frequent travelers',
      'Example: comfortable fit, long battery life, superior sound quality',
      'Example: casual, confident',
      'Example: 150'
    ],
    template: 'Create a captivating product description for {1} targeted at the audience of {2}. The description should highlight the key features or benefits, {3}, and adopt a {4} tone of voice. Craft the description within the {5} word count range, ensuring it effectively communicates the value of the product and encourages potential customers to make a purchase.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'PRODUCT TITLES': {
    questions: [
      'What is the product?',
      'What are the key features or selling points of the product?',
      'What is the maximum character count for the product title?'
    ],
    examples: [
      'Example: wireless noise-cancelling headphones',
      'Example: Bluetooth, long battery life, comfortable',
      'Example: 60'
    ],
    template: 'Create an eye-catching and informative product title for {1} that highlights its key features or selling points, {2}. Ensure the title stays within the {3} character limit, making it easy for potential customers to understand the product\'s value and enticing them to explore further.'
  },
  'PRODUCT FEATURES/ BULLETS': {
    questions: [
      'What is the product?',
      'What are the key features or selling points of the product?',
      'How many bullet points do you want to create?'
    ],
    examples: [
      'Example: smartphone',
      'Example: fast processor, high-resolution camera, long battery life',
      'Example: 5'
    ],
    template: 'Create {3} compelling and informative bullet points for {1} that showcase its key features or selling points, such as {2}. These bullet points should be concise and easy to understand, highlighting the unique aspects of the product and enticing potential customers to explore further.'
  },
  'AMAZON SPONSORED BRAND ADS HEADLINE': {
    questions: [
      'What is the product you are promoting?',
      'What are the key feature or selling points of the product?',
      'What tone of voice do you want for the headline?'
    ],
    examples: [
      'Example: wireless headphones',
      'Example: affordable, high-quality sound, comfortable',
      'Example: casual, confident'
    ],
    template: 'Create a captivating Amazon Sponsored Brand Ad headline for the {1} that showcases its key features or selling points, such as {2}. The headline should adopt a {3} tone of voice, enticing potential customers to click on the ad and explore the product further. Keep the headline concise, easy to understand, and focused on the unique aspects of the product that will appeal to Amazon shoppers.',
    tones: toneOptions,
    toneQuestionIndex: 2
  },
  'AMAZON PRODUCT TITLES': {
    questions: [
      'What is the product you are selling?',
      'What are the main features or benefits you want to highlight in the title?',
      'What is the positioning of your product in the market?'
    ],
    examples: [
      'Example: wireless headphones',
      'Example: Bluetooth, noise-cancelling, long battery life',
      'Example: Standard, Premium'
    ],
    template: 'Create a captivating and informative Amazon product title for the {1}. The title should showcase the key features or benefits, such as {2}, and reflect the {3} positioning of the product in the market. Make sure the title is concise, attention-grabbing, and accurately represents the product, helping it stand out from the competition and attract potential customers.'
  },
  'PERSONAL LETTER': {
    questions: [
      'What is the name of the recipient?',
      'What are the min topics or events you want to share in the letter?',
      'What tone would you like the letter to have?',
      'Do you have any specific anecdotes or stories you\'d like to include in the letter?'
    ],
    examples: [
      'Example: Emily',
      'Example: recent vacation, new job, family updates',
      'Example: warm and friendly',
      'Example: funny story about the vacation mishap'
    ],
    template: 'Write a personal letter to {1}, sharing the main topics or events such as {2} in a {3} tone. Be sure to include any specific anecdotes or stories that {4}. This letter should feel chummy and engaging, allowing you to catch up with the recipient and share your personal news, yarns, or escapades in a warm and friendly manner.',
    tones: toneOptions,
    toneQuestionIndex: 2
  },
  'BUSINESS LETTER': {
    questions: [
      'What is the name and company of the recipient?',
      'What is the main purpose of the letter?',
      'What tone would like the letter to have?',
      'Please provide any specific details or information you\'d like to include in the letter, such as order numbers, dates, or other relevant information.'
    ],
    examples: [
      'Example: John Smith, XYZ Corporation',
      'Example: order inquiry, complaint resolution',
      'Example: Polite and professional',
      'Example: Order #12345 from March 15th, 2023'
    ],
    template: 'Write a business letter addressed to {1} with the main purpose of {2}. Maintain a {3} tone throughout the letter and be sure to include any specific details or information that {4}. This letter should be clear, concise, and professional, allowing for effective communication between you and the recipient.',
    tones: toneOptions,
    toneQuestionIndex: 2
  },
  'COVER LETTER': {
    questions: [
      'What is the name and company of the recipient?',
      'What is the position or opportunity you are applying for?',
      'What are your top skills or qualifications relevant to the position?',
      'What tone would you like the cover letter to have?',
      'Please provide any specific details or information you\'d like to include in the cover letter, such as personal achievements, experiences, or reasons for applying.'
    ],
    examples: [
      'Example: Hiring Manager, ABC Company',
      'Example: software engineer, marketing assistant',
      'Example: strong analytical skills, excellent communication',
      'Example: enthusiastic, professional',
      'Example: 5 years of experience in software development, passion for innovation'
    ],
    template: 'Write a cover letter addressed to {1} for the {2} position. Highlight your top skills or qualifications, including {3}, and maintain a {4} tone throughout the letter. Be sure to include any specific details or information that {5}. This cover letter should be engaging, informative, and tailored to the opportunity you are applying for.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'REFERENCE/RECOMMENDATION LETTER': {
    questions: [
      'What is the name of the person you are writing the recommendation for?',
      'What is the purpose of the recommendation?',
      'What are the person\'s key strengths, skills, or qualities?',
      'How long have you known the person?',
      'In what capacity have you worked with or known the person?',
      'Please provide any specific details, anecdotes, or examples that demonstrate the person\'s strength, skills, or qualities.'
    ],
    examples: [
      'Example: John Smith',
      'Example: college admission, job application',
      'Example: team player, strong leadership skills',
      'Example: 2 years',
      'Example: Software Development Intern',
      'Example: led a team of 5 developers to complete a major project ahead of schedule'
    ],
    template: 'Write a reference/recommendation letter for {1} in support of their {2}. Highlight their key strengths, skills, or qualities, such as {3}. Mention that you have known them for {4} and your relationship with them in the capacity of {5}. Be sure to include any specific details, anecdotes, or examples that {6}. This letter should be engaging, informative, and tailored to help the person succeed in their application or pursuit.'
  },
  'RESIGNATION LETTER': {
    questions: [
      'What is your full name?',
      'What is your current job title?',
      'What is the name of the company you are resigning from?',
      'What is the name of your supervisor or manager?',
      'What is your last working day?',
      'Do you have any specific reasons for your resignation that you would like to mention?'
    ],
    examples: [
      'Example: John Smith',
      'Example: Marketing Manager',
      'Example: XYZ Company',
      'Example: Jane Doe',
      'Example: 2023-05-01',
      'Example: pursuing a new career opportunity, relocating to a different city'
    ],
    template: 'Write a resignation letter addressed to {4} at {3} announcing your departure from your current position as a {2}. Include your full name, {1}, in the letter. State that your last working day will be {5}. If applicable, mention any specific reasons for your resignation, such as {6}. The letter should be professional, concise, and respectful, while maintaining a positive tone and expressing gratitude for the opportunity.'
  },
  'THANK YOU LETTER': {
    questions: [
      'What is your full name?',
      'What is the full name of the person you are thanking?',
      'What are you thanking the person for (e.g., a gift, assistance, support, etc)?',
      'How has the person\'s action or gift positively impacted you?'
    ],
    examples: [
      'Example: John Smith',
      'Example: Jane Doe',
      'Example: a gift, assistance, support',
      'Example: your support during my job search'
    ],
    template: 'Write a heartfelt thank you letter from {1} to {2} expressing gratitude for {3}. Highlight the positive impact the person\'s action or gift has had on you, such as {4}. The letter should be warm, genuine, and appreciative, while maintaining a friendly and personal tone.'
  },
  'APOLOGY LETTER': {
    questions: [
      'What is your full name?',
      'What is the full name of the person you are apologizing to?',
      'What is the reason for your apology (e.g., a mistake, misunderstanding, or miscommunication)?',
      'What actions will you take to ensure the issue doesn\'t happen again?'
    ],
    examples: [
      'Example: John Smith',
      'Example: Jane Doe',
      'Example: a mistake, misunderstanding, or miscommunication',
      'Example: I will be more careful in the future'
    ],
    template: 'Write a sincere apology letter from {1} to {2} addressing the issue of {3}. Express genuine remorse and take responsibility for the situation. Describe the steps you will take, such as {4}, to ensure the issue doesn\'t happen again. The letter should be honest, humble, and demonstrate your commitment to making amends.'
  },
  'COMPLAINT LETTER': {
    questions: [
      'What is your full name?',
      'What is the title or name of the person you are addressing the complaint to?',
      'What is the name of the company or organization you are complaining about?',
      'What is the issue or problem you are complaining about?',
      'What resolution do you seek (e.g., refund, exchange, or correction of the issue)?'
    ],
    examples: [
      'Example: John Smith',
      'Example: Customer Service Manager',
      'Example: ABC Company',
      'Example: defective product, poor service, billing error',
      'Example: refund or exchange'
    ],
    template: 'Write a complaint letter from {1} to the {2} at {3} addressing the issue of {4}. Express your dissatisfaction in a clear, concise, and respectful manner. Provide specific details about the problem and request the desired resolution, such as {5}. The letter should be professional, assertive, and focused on solving the issue.'
  },
  'INVITATION LETTER': {
    questions: [
      'What is your full name (the sender of the invitation)?',
      'What is the full name of the person you are inviting?',
      'What is the name or theme of the event you are inviting them to?',
      'What date is the event?',
      'What time does the event start?',
      'What is the address of the event location?',
      'What is the RSVP deadline or any special instructions for the invitee?'
    ],
    examples: [
      'Example: John Smith',
      'Example: Jane Doe',
      'Example: Garden party',
      'Example: April 18, 2023',
      'Example: 14:00',
      'Example: 1234 Elm street, Springfield',
      'Example: RSVP by May 1st'
    ],
    template: 'Write an invitation letter from {1} to {2} for the {3}. Include the date of the event {4}, the start time {5}, the location {6}, and any RSVP instructions or special requirements {7}. The letter should be warm, welcoming, and clearly communicate the event details.'
  },
  'CONTENT REWRITER': {
    questions: [
      'What is the original content you would like to rewrite?'
    ],
    examples: [
      'Example: Paste your original content here that needs to be rewritten'
    ],
    template: 'Rewrite the following content to create a fresh, new piece while retaining the core meaning and information: {1}.'
  },
  'REWRITE WITH KEYWORDS': {
    questions: [
      'What is the original content you would like to rewrite?',
      'What are the keywords you want to include in the rewritten content?'
    ],
    examples: [
      'Example: Paste your original content here that needs to be rewritten',
      'Example: innovation, digital transformation, gadgets'
    ],
    template: 'Rewrite the following content, incorporating the provided keywords while retaining the core meaning and information: {1}. Keywords to include: {2}.'
  },
  'NICHE IDEAS': {
    questions: [
      'What general industry or topic are you interested in exploring niche ideas for?'
    ],
    examples: [
      'Example: health, technology, sustainability'
    ],
    template: 'Generate a list of niche ideas related to the industry or topic {1}.'
  },
  'ANALYZE GIVEN CONTENT': {
    questions: [
      'Please provide the content you would like to analyze:'
    ],
    examples: [
      'Example: Paste your content here for analysis'
    ],
    template: 'Analyze the given content: {1}. Identify key points, strengths, weaknesses, and opportunities for improvement.'
  },
  'INVESTIGATE A PARTICULAR NICHE': {
    questions: [
      'Please provide the niche you would like to investigate:'
    ],
    examples: [
      'Example: vegan skincare, remote work tools, sustainable fashion'
    ],
    template: 'Investigate the niche market: {1}. Provide insights into the target audience, current trends, opportunities, and potential challenges within this niche.'
  },
  'GENERATE BUSINESS IDEAS': {
    questions: [
      'What industry or niche do you want to generate business ideas for?',
      'How many business ideas would you like?',
      'What type of business ideas are you looking for?',
      'Are there any specific requirements or preferences for the business ideas?'
    ],
    examples: [
      'Example: health care',
      'Example: 5',
      'Example: Innovative, Traditional',
      'Example: low budget startups, online businesses'
    ],
    template: 'Generate {2} {3} business ideas for the {1} industry, taking into account any specific requirements or preferences such as {4}. These ideas should cater to the needs of the target market, offer unique value propositions, and have the potential for growth and profitability.'
  },
  'GENERATE DIGITAL PRODUCT IDEAS': {
    questions: [
      'What is the main industry or niche you want to generate digital product for?',
      'Who is your target audience?',
      'How many digital product ideas do you want to generate?',
      'What specific needs or desires do you want the digital products to address?'
    ],
    examples: [
      'Example: online education',
      'Example: busy professionals',
      'Example: 5',
      'Example: streamlined learning, quick courses'
    ],
    template: 'Generate {3} digital product ideas for the {1} industry or niche, targeting {2}. Focus on addressing the specific needs or desires mentioned, such as {4}, while ensuring the ideas are innovative, relevant, and appealing to your target audience. Consider various digital formats, platforms, and delivery methods to create a diverse and exciting list of potential digital products.'
  },
  'GENERATE PHYSICAL PRODUCT IDEAS': {
    questions: [
      'What is the main industry or niche you want to generate physical product ideas for?',
      'Who is your target audience?',
      'How many physical product ideas do you want to generate?',
      'What specific needs or desires do you want the physical product to address?'
    ],
    examples: [
      'Example: fitness',
      'Example: health-conscious individuals',
      'Example: 5',
      'Example: portable workout equipment, eco-friendly materials'
    ],
    template: 'Generate {3} physical product ideas for the {1} industry or niche, targeting {2}. Focus on addressing the specific needs or desires mentioned, such as {4}, while ensuring the ideas are innovative, relevant, and appealing to your target audience. Consider various product designs, materials, and functionalities to create a diverse and exciting list of potential physical products.'
  },
  'GENERATE DOMAIN NAME IDEAS': {
    questions: [
      'What is the main theme or focus of your website?',
      'What domain extensions are you interested in? (separate multiple options with a ",")',
      'How many domain name ideas do you want to generate?',
      'What type of domain names do you prefer?'
    ],
    examples: [
      'Example: eco-friendly clothing',
      'Example: .com, .net, .org',
      'Example: 10',
      'Example: Short and catchy, branded'
    ],
    template: 'Generate {3} domain name ideas for a website with the main theme or focus of {1}. Consider the domain extensions "{2}" and focus on creating {4} domain names that are relevant, memorable, and appealing. Ensure the domain names reflect the website\'s theme while also being easy for your target audience to find and remember.'
  },
  'KEYWORD RESEARCH': {
    questions: [
      'What is the main topic or niche you want to research keywords for?',
      'How many keywords would you like to generate?',
      'What type of keywords are you looking for?'
    ],
    examples: [
      'Example: vegan skincare',
      'Example: 20',
      'Example: High search volume, balanced'
    ],
    template: 'Conduct keyword research for the topic or niche {1} and generate a list of {2} relevant keywords. Focus on finding {3} keywords that will help improve the website\'s visibility, drive traffic, and optimize the content for search engines. The keywords should be closely related to the main topic and provide opportunities for creating valuable and engaging content that resonates with the target audience. Also provide estimated monthly search volume, cost per click, ad competition, and organic search competition nicely formatted inside a table.'
  },
  'GENERATE A BUSINESS PLAN': {
    questions: [
      'What is the name of your business?',
      'What is the main product or service your business will provide?',
      'Who is your target market?',
      'What is your business mission statement?',
      'List the main steps of your business strategy:',
      'Provide a brief overview of your financial plan and expenses:'
    ],
    examples: [
      'Example: GreenLeaf Cafe',
      'Example: Vegan cafe',
      'Example: Health-conscious consumers',
      'Example: The mission of GreenLeaf Cafe is to provide high-quality, plant-based meals...',
      'Example: 1. Market research: Identify competitors, analyze target market...',
      'Example: 1. Rent:$3000/month'
    ],
    template: 'Create a comprehensive business plan for {1}, a {2} targeting {3}. The mission statement for the business is as follows: {4}. The main steps of the business strategy include: {5}. The financial plan and expenses are as follows: {6}. The business plan should cover all aspects necessary for the successful launch and operation of the business, including marketing, operations, management, and financial projections.'
  },
  'CREATE CHAPTERS AND TOC': {
    questions: [
      "What is the title of your book?",
      "What is the main topic or niche of your ebook?",
      "Who is your target audience?",
      "How many chapters do you want in your ebook?",
      "What are the key points or subjects you'd like to cover in your ebook?"
    ],
    examples: [
      "Example: Mastering Mindfulness: A Journey to Inner peace",
      "Example: Health and wellness",
      "Example: Beginners looking to practice mindfulness",
      "Example: 8",
      "Example: Introduction to Mindfulness, Techniques, and Exercise"
    ],
    template: `Create a table of contents (TOC) for the ebook titled {1}, which focuses on the {2} topic and is tailored to the target audience of {3}. The TOC should include {4} chapters, and each chapter should be based on the key points or subjects provided: {5}. Organize the chapters in a logical sequence to create a comprehensive and engaging ebook that covers the main topic effectively.`
  },
  'CREATE CHAPTERS': {
    questions: [
      "What is the title of your ebook?",
      "What is the main topic or niche of your ebook?",
      "Who is your target audience?",
      "How many chapters do you want in your ebook?",
      "Please provide a brief description of each chapter or section in your book."
    ],
    examples: [
      "Example: Mastering Mindfulness: A Journey to Inner Peace",
      "Example: Health and wellness",
      "Example: Beginners looking to practice mindfulness",
      "Example: 8",
      "Example: Introduction: A Beginner's Guide to Mindfulness\nChapter 1: The Science Behind Mindfulness\nChapter 2: Techniques for Practicing Mindfulness\nChapter 3: Incorporating Mindfulness into Daily Life\nChapter 4: Mindfulness for Stress Reduction\nChapter 5: Mindfulness and Emotional Well-being\nChapter 6: Mindfulness for Improved Focus and Concentration\nChapter 7: The Future of Mindfulness"
    ],
    template: `Create detailed chapters or sections for the ebook titled {1}, which focuses on the {2} topic and is tailored to the target audience of {3}. The ebook should consist of {4} chapters or sections. Use the brief descriptions provided for each chapter or section: {5}. Write engaging and informative content that covers the main topic effectively and caters to the needs of the target audience.`
  },
  'EBOOK CONCLUSION': {
    questions: [
      "Ebook Summary",
      "Main Message",
      "Tone"
    ],
    examples: [
      "Example: Provide a brief summary of your ebook content including the main points discussed throughout the book",
      "Example: What is the main message or takeaway you want your readers to remember after reading your book",
      "Example: Casual, Creative"
    ],
    template: `Write a powerful conclusion for your ebook, summarizing the content and main points discussed throughout the book: {1}. Ensure the conclusion emphasizes the main message or takeaway, {2}, and leaves the reader with a lasting impression. Adopt a {3} tone to make the conclusion engaging and memorable for your readers.`,
    tones: toneOptions,
    toneQuestionIndex: 2
  },
  'CREATE A DISCLAIMER': {
    questions: [
      "Ebook Title",
      "Author Name",
      "Information Type",
      "Limitations/Exclusions"
    ],
    examples: [
      "Example: What is the title of your ebook?",
      "Example: What is your name or the name of the author?",
      "Example: General, Legal",
      "Example: Do you want to include any specific limitations or exclusions in your disclaimer? If not, leave this blank"
    ],
    template: `Create a strong disclaimer for the ebook titled "{1}" by {2}. The disclaimer should address the type of information provided in the ebook, which is {3} in nature. Make sure to clarify that the ebook is for informational purposes only and is not a substitute for professional advice. If any specific limitations or exclusions should be included, mention them: {4}. The disclaimer should protect the author from potential legal issues related to the content of the ebook.`
  },
  'EBOOK CALL TO ACTION': {
    questions: [
      "Ebook Topic",
      "Desired Action",
      "Number of CTAs",
      "Tone of voice"
    ],
    examples: [
      "Example: What is the main topic of your ebook?",
      "Example: What specific action do you want your readers to take after reading your ebook?",
      "Example: How many call-to-actions do you want throughout your ebook?",
      "Example: Casual, Creative"
    ],
    template: `Generate {3} call-to-action ideas for an ebook on the topic of {1}. The call-to-actions should be designed to encourage readers to take the specific action of {2} after reading the ebook. Use a {4} tone of voice to make the call-to-actions engaging and persuasive. The call-to-actions should be placed strategically throughout the ebook, aligning with the content and the desired reader journey.`,
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'EBOOK AUTHOR BIO': {
    questions: [
      "Author's Name",
      "Author's Background",
      "Personal Interests",
      "Tone of Voice"
    ],
    examples: [
      "Example: What is the author's name?",
      "Example: What is the author's background or expertise related to the ebook's topic?",
      "Example: What are some personal interests or hobbies of the author?",
      "Example: Casual, Creative"
    ],
    template: `Write an author bio for {1}, the author of an ebook. The bio should highlight the author's background and expertise in the ebook's topic, which is {2}. Include some personal interests or hobbies of the author, such as {3}. Use a {4} tone of voice to make the author bio engaging and memorable, while showcasing the author's personality and expertise.`,
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'SEO META TAGS': {
    questions: [
      "What is the title of the page?",
      "What are the target keywords for the page?",
      "What type of page is it?"
    ],
    examples: [
      "Example: Best Travel Tips for Solo Travelers",
      "Example: travel tips, solo travel, travel guide",
      "Example: Blog post, Homepage, Product page, Services page"
    ],
    template: `Create SEO meta tags for a {3} titled "{1}". The tags should be optimized for the target keywords: {2}. Ensure that the meta tags are relevant and specific to the page content, helping to improve the page's search engine rankings and visibility.`
  },
  'SEO META DESCRIPTIONS': {
    questions: [
      "What is the title of the page?",
      "What is a brief description of the page's content?",
      "What are the target keywords for the page?",
      "What type of page is it?"
    ],
    examples: [
      "Example: Best Travel Tips for Solo Travelers",
      "Example: Discover the best travel tips for solo travelers, including safety advice, packing tips, and destination recommendations.",
      "Example: travel tips, solo travel, travel guide",
      "Example: Blog post, Homepage, Product page, Services page"
    ],
    template: `Write an engaging SEO meta description for a {4} titled "{1}". The description should provide a brief overview of the page's content: {2}. Make sure to include the target keywords {3} in the description, optimizing it for search engines and enticing users to click through to the page.`
  },
  'PODCAST SCRIPT': {
    questions: [
      "What is the title of your podcast?",
      "What is the main theme or topic of your podcast?",
      "How many main talking points or segments do you want in the script?",
      "What tone of voice do you want in the script?"
    ],
    examples: [
      "Example: The Solo Traveler's Guide",
      "Example: Travel",
      "Example: 3",
      "Example: 3"
    ],
    template: `Create a captivating podcast script for "{1}", a podcast focused on the theme of {2}. The script should include {3} main talking points or segments and adopt a {4} tone of voice. The script should engage the listeners and maintain their interest throughout the podcast, leading them to eagerly anticipate the next episode.`,
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'PODCAST INTERVIEW QUESTIONS': {
    questions: [
      "What is the title of your podcast?",
      "Who is the guest you will be interviewing?",
      "What is the main theme or topic of your podcast?",
      "How many interview questions do you want?"
    ],
    examples: [
      "Example: The Solo Traveler's Guide",
      "Example: John Smith, experienced solo traveler and author",
      "Example: Travel",
      "Example: 5"
    ],
    template: `Create {4} engaging and thought-provoking interview questions for "{1}", a podcast focused on the theme of {3}. The guest for this interview is {2}. The questions should be designed to elicit interesting and informative responses from the guest, providing listeners with valuable insights and keeping them hooked on the conversation.`
  },
  'DIGITAL PRODUCT REVIEW': {
    questions: [
      "What is the name of the digital product you want to review?",
      "What type of digital product is it?",
      "Who is the creator or author of the digital product?",
      "On a scale of 1-5, how would you rate the digital product?",
      "What are the key strength and weaknesses of the digital product?"
    ],
    examples: [
      "Example: Super E-commerce Mastery Course",
      "Example: online course, ebook, software, etc.",
      "Example: John Smith",
      "Example: 1, 2, 3",
      "Example: I really like the content, and the way it was structured, but i think it could use more real-life examples."
    ],
    template: `Write a comprehensive review of the digital product "{1}", a {2} created by {3}. In the review, discuss the key strengths and weaknesses of the product as mentioned in {5}. Rate the product on a scale of 1 to 5, with 1 being the lowest and 5 being the highest, based on your evaluation of its overall quality, usefulness, and value. The final rating for the product is {4}.`
  },
  'PHYSICAL PRODUCT REVIEW': {
    questions: [
      "What is the name of the physical product you want to review?",
      "In which category does the physical product belong?",
      "Who is the manufacturer of the physical product?",
      "On a scale of 1-5, how would you rate the physical product?",
      "What are the key strengths and weaknesses of the physical product?"
    ],
    examples: [
      "Example: XYZ Wireless Headphones",
      "Example: Electronics",
      "Example: XYZ Company",
      "Example: 1, 2",
      "Example: The sound quality is excellent, but the battery life could be improved."
    ],
    template: `Write a comprehensive review of the physical product "{1}", which belongs to the {2} category and is manufactured by {3}. In the review, discuss the key strengths and weaknesses of the product as mentioned in {5}. Rate the product on a scale of 1 to 5, with 1 being the lowest and 5 being the highest, based on your evaluation of its overall quality, performance, and value. The final rating for the product is {4}.`
  },
  'MINI-VSL (VIDEO SALES LETTER)': {
    questions: [
      "What is the name of the product or service you are promoting?",
      "What type of product or service is it?",
      "Who is the creator or author of the product or service?",
      "What is the main benefit or result that the product or service delivers?",
      "What is the website or URL where the product or services can be found?",
      "How long should the video sales letter be, in seconds (between 60 and 90)?"
    ],
    examples: [
      "Example: E-commerce Mastery Course",
      "Example: Online course",
      "Example: John Smith",
      "Example: Helps you build a successful e-commerce business from scratch",
      "Example: www.super-ecommerce-mastery.com",
      "Example: 60"
    ],
    template: `Write a captivating 60-90 second video sales letter script for "{1}", a {2} created by {3}". The script should highlight the main benefit of the product or service: {4}. At the end of the script, direct viewers to visit {5} to learn more or make a purchase. The video sales letter should be {6} seconds long and create curiosity and excitement for the offer.`
  },
  'YOUTUBE SCRIPT': {
    questions: [
      "What is the title or topic of the youtube video?",
      "How many main points or sections do you want to cover in the script?",
      "What is the main purpose or tone of the video?",
      "Approximately how many minutes should the video be?",
      "Please provide a brief outline or structure for the video script."
    ],
    examples: [
      "Example: 10 ways to improve your Productivity",
      "Example: 5",
      "Example: confident, Creative",
      "Example: 10",
      "Example: Introduce the topic, explain the importance of productivity, list the 10 ways, provide examples for each, and summarize the main points"
    ],
    template: `Write a captivating YouTube script based on the title or topic "{1}". The script should cover {2} main points or sections, and its main purpose or tone should be {3}. The video should be approximately {4} minutes long. Follow the provided outline or structure: {5}. Make sure the script is engaging and keeps the viewers' attention throughout the video.`,
    tones: toneOptions,
    toneQuestionIndex: 2
  },
    'MINI-VSL (VIDEO SALES LETTER)': {
      questions: [
        "What is the name of your product or service?",
        "What is the main problem your product or service solves?",
        "What are the key benefits of your product or service?",
        "What is the main objection or concern your target audience has?",
        "What is the call to action you want viewers to take?"
      ],
      examples: [
        "Example: Productivity Mastery Course",
        "Example: Lack of time management skills",
        "Example: Increased productivity, better work-life balance, reduced stress",
        "Example: I don't have time to learn new skills",
        "Example: Click the link below to get started today"
      ],
      template: `Create a compelling mini-VSL (Video Sales Letter) script for {1}. The script should address the main problem of {2} and highlight the key benefits: {3}. Address the main objection or concern: {4}. The script should be persuasive and encourage viewers to take the call to action: {5}. Make sure the script is engaging and keeps viewers watching until the end.`
    },
    'DIGITAL PRODUCT REVIEW': {
      questions: [
        "What is the name of the digital product you want to review?",
        "What is the main purpose or function of this digital product?",
        "What are the key features of the digital product?",
        "What is the target audience for this digital product?",
        "What is the tone of voice you want for the review?"
      ],
      examples: [
        "Example: Grammarly Premium",
        "Example: Grammar and writing assistance tool",
        "Example: Real-time grammar checking, plagiarism detection, writing suggestions",
        "Example: Students, professionals, writers",
        "Example: Professional, informative"
      ],
      template: `Write a comprehensive digital product review for {1}, which is {2}. The review should cover the key features: {3}. The review should be tailored to the target audience of {4}. Use a {5} tone of voice to make the review informative and trustworthy. Include both the pros and cons of the product to provide a balanced perspective.`
    },
    'PHYSICAL PRODUCT REVIEW': {
      questions: [
        "What is the name of the physical product you want to review?",
        "What is the main purpose or function of this physical product?",
        "What are the key features of the physical product?",
        "What is the target audience for this physical product?",
        "What is the tone of voice you want for the review?"
      ],
      examples: [
        "Example: iPhone 15 Pro",
        "Example: Smartphone with advanced camera and performance features",
        "Example: 48MP camera, A17 Pro chip, titanium design, USB-C charging",
        "Example: Tech enthusiasts, professionals, photography lovers",
        "Example: Enthusiastic, detailed"
      ],
      template: `Write a comprehensive physical product review for {1}, which is {2}. The review should cover the key features: {3}. The review should be tailored to the target audience of {4}. Use a {5} tone of voice to make the review engaging and informative. Include both the pros and cons of the product to provide a balanced perspective, and mention the overall value for money.`
    },
    'YOUTUBE HOOKS': {
      questions: [
        'What is the main topic or theme of your YouTube video?',
        'Who is the target audience for your video?'
      ],
      examples: [
        'Travel tips',
        'Beginner travelers'
      ],
      template: 'Create a catchy and attention-grabbing hook for a YouTube video focusing on the topic of {1} and targeting the audience of {2}. The hook should be compelling and make viewers eager to watch the video, ensuring they stay engaged and continue watching your content. It should also give them a hint of what to expect from the video, but without revealing too much, maintaining their curiosity and interest throughout.'
    },
    'YOUTUBE OUTLINES': {
      questions: [
        'What is the main topic of your YouTube video?',
        'Who is the target audience for your video?',
        'How many sections do you want in the outline?',
        'What tone or style do you want for your video?'
      ],
      examples: [
        '10 travel hacks',
        'Beginner travelers',
        '4',
        'Casual, confident'
      ],
      template: 'Create a detailed outline for a YouTube video on the topic of {1} targeted at the audience of {2}. The outline should have {3} sections and adopt a {4} tone or style. Each section should cover a different aspect of the main topic and be designed to guide the video creation process, resulting in a well-organized, informative, and engaging video for the viewers. The outline should also ensure that the content flows smoothly, keeping the audience captivated and encouraging them to watch the entire video.'
    },
    'YOUTUBE SHORTS': {
      questions: [
        'What is the main topic of your YouTube Short?',
        'Who is the target audience for your short?',
        'What tone or style do you want for your short?',
        'What is the desired length of your YouTube short in seconds?'
      ],
      examples: [
        'Easy yoga poses',
        'Beginner yoga enthusiasts',
        'Casual, Creative',
        '16'
      ],
      template: 'Create a captivating script for a YouTube Short on the topic of {1} targeted at the audience of {2}. The script should adopt a {3} tone or style and be approximately {4} seconds long. Ensure the content is engaging and attention-grabbing, keeping in mind the short format and time constraint of YouTube Shorts. The script should be concise, conveying the main message quickly and effectively to keep viewers interested and encourage them to watch more of your content.'
    },
    'TIKTOK VIDEO SCRIPT': {
      questions: [
        'What is the main topic of your TikTok video?',
        'Who is the target audience for your video?',
        'What tone or style do you want for your video?',
        'What is the desired length of your TikTok video in seconds?'
      ],
      examples: [
        'Quick recipes',
        'Busy people who want to cook at home',
        'Casual, Creative',
        '30'
      ],
      template: 'Create an engaging script for a TikTok video on the topic of {1} targeted at the audience of {2}. The script should adopt a {3} tone or style and be approximately {4} seconds long. Make sure the content is captivating and attention-grabbing, considering the short format and time constraint of TikTok videos. The script should be concise, conveying the main message quickly and effectively to keep viewers interested and encourage them to follow your account for more content.'
    },
    'TIKTOK VIDEO HOOKS': {
      questions: [
        'What is the main topic of your TikTok video?',
        'Who is the target audience for your video?',
        'What tone or style do you want for your video?'
      ],
      examples: [
        'Dance tutorial',
        'Aspiring dancers',
        'Casual, confident'
      ],
      template: 'Create a compelling hook for a TikTok video on the topic of {1} targeted at the audience of {2}. The hook should adopt a {3} tone or style, instantly grabbing the viewer\'s attention and making them want to watch the entire video. The hook should be concise and intriguing, effectively setting the stage for the rest of the content and encouraging viewers to engage with your TikTok account.'
    },
    'TIKTOK VIDEO IDEAS': {
      questions: [
        'What is the main theme or category for your TikTok video ideas?',
        'Who is the target audience for your video ideas?',
        'How many video ideas do you want to generate?',
        'What tone or style do you want for your video ideas?'
      ],
      examples: [
        'Fitness',
        'Fitness enthusiasts',
        '10',
        'Casual, Creative'
      ],
      template: 'Generate {3} unique and captivating TikTok video ideas in the theme or category of {1}, targeted at the audience of {2}. The video ideas should adopt a {4} tone or style, ensuring that they are attention-grabbing and appealing to the target audience. These ideas should inspire viewers to engage with your TikTok account, providing a variety of content that keeps them interested and entertained. Consider current trends and popular topics within the chosen theme or category to maximize the potential for virality and growth on the platform.'
    },
    'DIGITAL PRODUCT VIDEO': {
      questions: [
        'What is the digital product you want to promote in the video?',
        'Who is the target audience for your digital product?',
        'How many seconds do you want the video script to be?',
        'What tone of voice do you want for the video script?',
        'What are some keywords or phrases to include in the video scripts?'
      ],
      examples: [
        'Online course on python programming',
        'Beginner programmers',
        '120',
        'Confident, creative',
        'Python programming, learn python, coding courses'
      ],
      template: 'Create a {3}-second video script to promote the digital product {1}, targeted at the audience of {2}. The script should adopt a {4} tone of voice and incorporate the keywords or phrases {5} to effectively convey the benefits and features of the digital product. The video should be engaging, attention-grabbing, and clearly explain how the product can help the target audience solve a specific problem or improve their skills. Use a compelling call-to-action to encourage viewers to explore the product further or make a purchase.'
    },
    'PHYSICAL PRODUCT VIDEO': {
      questions: [
        'What is the physical product you want to promote in the video?',
        'Who is the target audience for your physical product?',
        'How many seconds do you want the video scripts to be?',
        'What tone of voice do you want for the video script?',
        'What are some keywords or phrases to include in the video script?'
      ],
      examples: [
        'Smartphone case with a built-in battery',
        'Smartphone users',
        '90',
        'Casual, Confident',
        'phone case, battery case, smartphone accessories'
      ],
      template: 'Create a {3}-second video script to promote the physical product {1}, targeted at the audience of {2}. The script should adopt a {4} tone of voice and incorporate the keywords or phrases {5} to effectively showcase the benefits and features of the physical product. The video should be engaging, attention-grabbing, and clearly demonstrate how the product can improve the user\'s experience or solve a specific problem. Use a compelling call-to-action to encourage viewers to explore the product further or make a purchase.'
    },
    'SHORT AD VIDEO': {
      questions: [
        'What product or service are you promoting in the short ad video?',
        'Who is the target audience for your product or service?',
        'How many seconds do you want the short ad video script to be?',
        'What tone of voice do you want for the short ad video script?',
        'What are some keywords or phrases to include in the short ad video script?'
      ],
      examples: [
        'Wireless noise-cancelling headphones',
        'Music enthusiasts, office workers',
        '15',
        'Casual, Confident',
        'noise-canceling, wireless, comfortable'
      ],
      template: 'Create a {3}-second short ad video script to promote the product or service {1}, targeted at the audience of {2}. The script should adopt a {4} tone of voice and incorporate the keywords or phrases {5} to effectively highlight the benefits and features of the product or service. The video should be engaging, attention-grabbing, and persuasive, using a clear call-to-action to encourage viewers to explore the product or service further or make a purchase.'
    },
    'TUTORIAL VIDEO': {
      questions: [
        'What is the topic of the tutorial video?',
        'Who is the target audience for the tutorial video?',
        'How many steps or sections do you want to include in the tutorial?',
        'What tone of voice should the tutorial video script have?',
        'What are some important keywords or phrases to include in the tutorial video script?'
      ],
      examples: [
        'How to set up a home recording studio',
        'Beginner musicians, podcasters',
        '3',
        'Instructive, friendly',
        'microphone, audio interface, software'
      ],
      template: 'Create an explainer-style tutorial video script on the topic of {1} for the target audience of {2}. The tutorial should be organized into {3} clear steps or sections, adopting a {4} tone of voice. Make sure to incorporate the keywords or phrases {5} to effectively explain the process, ensuring the content is engaging, informative, and easy to follow. The tutorial should empower viewers to confidently perform the task or learn the skill being demonstrated, leaving them with a sense of accomplishment.'
    },
    'INFORMATIONAL VIDEO': {
      questions: [
        'What is the topic of the informational video?',
        'Who is the target audience for the informational video?',
        'How many main points or sections do you want to include in the informational video?',
        'What tone of voice should the informational video script have?',
        'What are some important keywords or phrases to include in the informational video script?'
      ],
      examples: [
        'The history of the internet',
        'Students, tech enthusiasts',
        '4',
        'casual, creative',
        'ARPANET, World Wide Web, Tim Berners-Lee'
      ],
      template: 'Create an informative video script on the topic of {1} for the target audience of {2}. The script should be organized into {3} main points or sections, adopting a {4} tone of voice. Make sure to incorporate the keywords or phrases {5} to effectively present the information, ensuring the content is engaging, informative, and easy to understand. The video should provide the viewers with valuable knowledge and insights into the topic, leaving them with a deeper understanding and appreciation of the subject matter.'
    },
    'ANNOUNCEMENT VIDEO': {
      questions: [
        'What is the announcement about?',
        'Who is the target audience for the announcement video?',
        'What tone of voice should the announcement video script have?',
        'What are the key details or information that need to be included in the announcement?',
        'Is there any call to action or additional information you want to provide at the end of the announcement video?'
      ],
      examples: [
        'New product launch',
        'Customers, investors',
        'Casual, Creative',
        'Product features, release date, special offers',
        'call to action, website link'
      ],
      template: 'Create an announcement video script about {1} targeted at the audience of {2}. The script should adopt a {3} tone of voice and include all the key details and information such as {4}. At the end of the video, make sure to include the call to action or any additional information {5} to encourage the viewers to take the desired action or learn more about the announcement. The script should effectively convey the excitement and importance of the announcement while engaging the viewers and encouraging them to take action.'
    },
    'FACEBOOK AD VIDEO': {
      questions: [
        'What product or service are you promoting in the Facebook ad video?',
        'Who is the target audience for Facebook ad video?',
        'What tone of voice should the Facebook ad video script have?',
        'What are the key selling points or benefits of your product or service?',
        'What is the call to action for the Facebook ad video?'
      ],
      examples: [
        'Fitness app, Online course',
        'Young professionals, stay-at-home parents',
        'Casual, Engaging',
        'Key features, benefits, limited-time offer',
        'Visit our website, download the app'
      ],
      template: 'Create a Facebook ad video script promoting {1} targeted at the audience of {2}. The script should adopt a {3} tone of voice and highlight the key selling points and benefits of the product or service such as {4}. At the end of the video, make sure to include a clear call to action {5} to encourage the viewers to take the desired action. The script should be engaging, persuasive, and optimized for social media to capture the attention of the target audience and drive results.'
    },
    'EMAIL SUBJECT LINES': {
      questions: [
        'What is the purpose of the email?',
        'What tone of voice should the email subject lines have?',
        'What is the main highlight or offer in the email?',
        'How many email subject lines would you like?'
      ],
      examples: [
        'Newsletter, product launch, special offer',
        'Casual, Engaging',
        'Limited-time discount, upcoming event, new product',
        '3'
      ],
      template: 'Create {4} email subject lines that grab the attention of the recipient and encourage them to open the email. The subject lines should be aligned with the purpose of the email {1} and adopt a {2} tone of voice. Make sure to include the main highlight "{3}" or offer to create a sense of urgency and entice the recipient to read the email. The subject lines should be catchy, relevant, and optimized for driving open rates.'
    },
    'PRODUCT OR SERVICE PROMOTION': {
      questions: [
        'What is your product or service name?',
        'What type of product?',
        'What is your niche audience?',
        'What are the main features or benefits?',
        'What is the promotion deadline?',
        'Maximum number of words.',
        'Who is the email from?',
        'Any other details to include?'
      ],
      examples: [
        'Website funnel builder 1000',
        'Website building software',
        'Online and offline business owners',
        'Free hosting, simple user interface, save time, 1000\'s of templates to choose from',
        '72 hours',
        '250',
        'John Doe',
        'Also get a 30-day money back guarantee. Plus get 10 extra bonuses if you order today'
      ],
      template: 'Write the body copy for a promotional email for a product titled {1} which is a {2} product. The email should target a {3} audience and highlight these features: {4}. The email should be {6} words in length and it would be nice to mention {8}. This promotion will last for: {5}. The email is from {7}'
    },
    'NEWS ANNOUNCEMENT EMAIL': {
      questions: [
        'What is the main news or announcement you want to share?',
        'What is the headline or main highlight of the announcement?',
        'What tone of voice should the email have?',
        'Who is the target audience for this email?',
        'Is there a relevant link or call to action you want to include?'
      ],
      examples: [
        'Launching a new product, announcing a partnership, company update',
        'Our new product, our partnership with XYZ',
        'Confident, casual',
        'Our loyal customers, industry partners, investors',
        'www.example.com/new-product'
      ],
      template: 'Compose a news announcement email that informs the target audience {4} about the main news or announcement {1}. The email should have a captivating headline {2} and adopt a {3} tone of voice. Make sure to highlight the key points and provide any relevant link or call to action {5} to encourage the recipients to learn more about the announcement. Keep the email concise, informative, and engaging to pique the readers\' interest.'
    },
    'PRODUCT UPDATES EMAIL': {
      questions: [
        'What are the main updates or improvements to the products?',
        'What are the specific changes or updates you want to highlight?',
        'What tone of voice should the email have?',
        'Who is the target audience for this email?',
        'Is there a relevant link or call to action you want to include?'
      ],
      examples: [
        'New features, bug fixes, performance improvements',
        'Feature X, Bug Fix Y, Improved performance Z',
        'Casual, Encouraging',
        'Our loyal customers, users of our software, subscribers',
        'www.example.com/updates'
      ],
      template: 'Compose a product updates email that informs the target audience {4} about the main updates or improvements to the product {1}. The email should highlight specific changes or updates {2} and adopt a {3} tone of voice. Make sure to emphasize the benefits of the updates and provide any relevant link or call to action {5} to encourage the recipients to explore the new features or improvements. Keep the email concise, informative, and engaging to pique the readers\' interest.'
    },
    'INFORMATIONAL EMAIL': {
      questions: [
        'What is the main topic or subject of the informational email?',
        'What tone of voice should the email have?',
        'Who is the target audience for this email?',
        'Is there a relevant link or call to action you want to include?',
        'What are the key points or pieces of information you want to share in the email?'
      ],
      examples: [
        'The importance of cybersecurity, The benefits of meditation',
        'Casual, Creative',
        'Our loyal customers, users of our software, subscribers',
        'www.example.com/blog/cybersecurity',
        'Three key points about cybersecurity, Five benefits of meditation'
      ],
      template: 'Compose an informational email that educates the target audience {3} on the main topic or subject {1}. The email should convey the key points or pieces of information {5} in a {2} tone of voice. Make sure to present the information in a clear, engaging, and informative manner. Include any relevant link or call to action {4} to encourage the recipients to learn more about the topic or take a desired action. Keep the email concise and focused on delivering value to the readers.'
    },
    'COLD OUTREACH EMAILS': {
      questions: [
        'What product or service are you offering?',
        'Who is the target audience for this email?',
        'What tone of voice should the email have?',
        'What is the main value proposition or incentive you want to offer?',
        'Is there a relevant link or call to action you want to include?'
      ],
      examples: [
        'Content marketing services, web development',
        'Marketing managers, Small business owners',
        'Casual, Creative',
        'A case study, A free consultation',
        'www.example.com/services/content marketing'
      ],
      template: 'Compose a cold outreach email that targets {2} and offers {1} in a {3} tone of voice. The email should clearly present the main value proposition or incentive {4} to entice the recipients to learn more about the product or service. Include any relevant link or call to action {5} to encourage the recipients to explore your offering or take the desired action. Keep the email concise, personalized, and focused on demonstrating how your product or service can solve a specific problem or provide a unique benefit to the target audience.'
    },
    'AUTORESPONDER SERIES': {
      questions: [
        'What is the purpose of this autoresponder series?',
        'How many emails should be in this series?',
        'What are the key messages or actions you want to convey in the series?',
        'What tone of voice should the emails have?',
        'Are there any specific links or call to action you want to include in the emails?'
      ],
      examples: [
        'Onboarding, Sales funnel',
        '5',
        'Educate about the product, Offer a limited-time discount',
        'Casual, Confident',
        'www.example.com/products, www.example.com/contact'
      ],
      template: 'Create a {2}-email autoresponder series for the purpose of {1}. The series should be in a {4} tone of voice and convey the key messages or actions {3}. Each email should be concise, engaging, and focused on nudging the reader towards taking the desired action. Include any specific links or call to actions {5} where appropriate to encourage the reader to explore your offering or take the next step. Ensure that the series is well-structured and flows smoothly from one email to the next, maintaining the reader\'s interest and building trust throughout.'
    },
    'GENERAL SUPPORT SCRIPT': {
      questions: [
        'What is the name of your business?'
      ],
      examples: [
        'Acme Company'
      ],
      template: 'Please help me create a general support script for {1} that guides customers seeking assistance. The script should be professional and provide clear instructions on how they can reach out to the support team or access relevant resources. Thank you!'
    },
    'PRODUCT/SERVICE ACCESS': {
      questions: [
        'What is the product or service customers need access to?',
        'What is the URL or location where customers can access the product or service?'
      ],
      examples: [
        'Acme Online Course',
        'https://acme.com/login'
      ],
      template: 'I need a customer support script for granting access to {1}. Please provide clear instructions on how customers can access it using the link or location {2}. Additionally, include troubleshooting tips or contact information for further assistance. Thank you!'
    },
    'SUPPORT SOLUTION FOR A PROBLEM': {
      questions: [
        'What is the problem the customer is facing?',
        'Who is addressing the issue?'
      ],
      examples: [
        'Unable to log in to account',
        'Our support team'
      ],
      template: 'I need a support script to help a customer who is facing an issue with {1}. The script should be written on behalf of {2}. Please provide a clear and helpful solution for the customer, along with additional resources or contact information they can use if they require further assistance. Thank you!'
    },
    'SUPPORT AUTORESPONDER MESSAGE': {
      questions: [
        'What is the name of your business?',
        'What is the estimated response time for support inquiries?'
      ],
      examples: [
        'Acme Company',
        '24-48 hours'
      ],
      template: 'I need a support autoresponder message for {1}. The message should reassure customers that their inquiry has been received and provide an estimated response time of {2}. Additionally, include any helpful links or resources that customers can access while they wait for a reply. Thank you!'
    },
    'ENGAGING QUESTIONS': {
      questions: [
        'What is the context for these engaging questions?',
        'How many engaging questions do you want to generate?',
        'What is the main topic or theme of the questions?'
      ],
      examples: [
        'social media post, blog post, event, podcast',
        '5',
        'marketing'
      ],
      template: 'Create {2} engaging questions for a {1} related to the topic of {3} that will encourage audience interaction and spark meaningful conversations.'
    },
    'CREATIVE STORY': {
      questions: [
        'What is the main theme of your story?',
        'Who is the main character in your story?',
        'What is the setting of your story?',
        'What is the story\'s point of view?',
        'How many words do you want your story to be?'
      ],
      examples: [
        'A magical adventure',
        'Alice',
        'A mystical forest',
        'First person',
        '1000'
      ],
      template: 'Please write a {5}-word creative story with the theme of "{1}". The story should feature the main character {2} and take place in {3}. The story should be written in {4} person point of view.'
    },
    'SUMMARIZE TEXT': {
      questions: [
        'Please provide the text you\'d like to summarize:',
        'How many words should the summary be?'
      ],
      examples: [
        'In a world where magic and science coexist',
        '100'
      ],
      template: 'Summarize the following text in {2} words: {1}'
    },
    'CITATIONS GENERATOR': {
      questions: [
        'Please provide the source information:',
        'Which citation style would you like to use?'
      ],
      examples: [
        'Smith J. (2020). The Art of Cooking: Mastering the Basics. New York: Penguin Publishing.',
        'APA|MLA|Chicago|Harvard'
      ],
      template: 'Generate a citation for the following source information in the {2} style: {1}'
    },
    'QUOTES GENERATOR': {
      questions: [
        'What is the theme or topic of the quote?',
        'What mood or tone do you want the quote to have?',
        'How many quotes would you like to generate?'
      ],
      examples: [
        'inspiration, love',
        'Uplifting, thoughtful',
        '10'
      ],
      template: 'Generate {3} {2} quotes on the theme of {1}.'
    },
    'TONE CHANGER': {
      questions: [
        'What text do you want to change the tone of?',
        'What tone would you like to apply to the text?'
      ],
      examples: [
        'The weather was sunny and warm, making it a perfect day for a picnic',
        'Formal, casual'
      ],
      template: 'Change the tone of the given text: {1} to be {2}.'
    },
    'SONG LYRICS': {
      questions: [
        'What is the main theme or subject of the song?',
        'What is the genre of the song?',
        'How many verses do you want in the song?',
        'Do you want a chorus?',
        'If yes, how many times should the chorus appear?',
        'Do you have a bridge?'
      ],
      examples: [
        'Love',
        'Pop|Rap|Hip-hop|Electronic|Jazz|Folk',
        '3',
        'Yes',
        '2',
        'yes'
      ],
      template: 'Write a song in the {2} genre with the theme of {1}. The song should have {3} verses. Include a chorus that appears {5} times. Include a bridge.'
    },
    'REAL ESTATE LISTING DESCRIPTIONS': {
      questions: [
        'How many bedrooms does the property have?',
        'How many Bathrooms does the property have?',
        'What is the square footage of the property?',
        'What type of property is it?',
        'What are the key features of the property?',
        'What is the address of the property?',
        'What is the asking price for the property?'
      ],
      examples: [
        '3',
        '2',
        '1500',
        'Single-family home|Apartment|Condo|Townhouse',
        'Quiet neighborhood, close to schools, large backyard',
        '123 Main st, Springfield, USA',
        '350000'
      ],
      template: 'Create a real estate listing description for a {4} located at {6}. The property has {1} bedrooms, {2} bathrooms, and is {3} square feet. The key features of the property include: {5}. The asking price is ${7}.'
    },
    'PAS FRAMEWORK': {
      questions: [
        'What is the main pain point your target audience is experiencing?',
        'What emotions or consequences result from this pain point?',
        'What is your solution to this pain point?',
        'What are the benefits of your solution?'
      ],
      examples: [
        'Not having enough time to complete daily tasks',
        'Feeling overwhelmed, stressed, and disorganized',
        'Time management app',
        'Increase productivity, saves time, reduces stress'
      ],
      template: 'Use the PAS (Pain-Agitate-Solutions) framework to create sales copy addressing the pain point of {1}. Describe the emotions and consequences related to this pain point: {2}. Introduce the solution: {3} and highlight its benefits: {4}.'
    },
    'REVIEW RESPONDER': {
      questions: [
        'What is the name of the reviewer?',
        'What is the star rating of the review?',
        'What is the content of the review?',
        'What is the name of your business or product?'
      ],
      examples: [
        'Jane Doe',
        '5',
        'I had a fantastic experience with this company. Their customer service was top-notch and the product exceeded my expectations!',
        'Acme Widgets'
      ],
      template: 'Respond to a review from {1} who gave your business or product, {4}, a {2}-star rating. The review content is as follows: {3}.'
    },
    'AIDA FRAMEWORK': {
      questions: [
        'What is the name of the product or service you want to promote?',
        'What type of product or service is it?',
        'What are the key features or benefits of the product or service?',
        'What is the call to action or special offer?',
        'What is the maximum word count for the AIDA framework copy?'
      ],
      examples: [
        'Superclean 3000',
        'A vacuum cleaner',
        'Efficient cleaning, lightweight design, versatile attachments',
        '10% off for a limited time',
        '200'
      ],
      template: 'Create an AIDA framework copy for {1}, a {2} with features such as {3}. The call to action or special offer is {4}. The copy should not exceed {5} words.'
    },
    'PRODUCT NAMES': {
      questions: [
        'What is a brief description of the product or service?',
        'What is the target market or niche for this product or service?',
        'What are the target features or benefits of the product or service?',
        'How many product name suggestions would you like?'
      ],
      examples: [
        'A high-performance electric skateboard',
        'Outdoor sports, transportation',
        'fast, reliable, eco-friendly',
        '5'
      ],
      template: 'Generate {4} product name suggestions for a {1} targeting the {2} market. The key features or benefits of this product or service are {3}.'
    },
    'ANALOGY MAKER': {
      questions: [
        'What is the concept or topic you\'d like an analogy for?',
        'What is a related concept or idea that could be used in the analogy?',
        'How many analogies would you like?'
      ],
      examples: [
        'Time management',
        'Budgeting money',
        '1'
      ],
      template: 'Generate {3} analogy(ies) comparing {1} to {2}.'
    },
    'GROWTH IDEAS': {
      questions: [
        'What type of business are you looking for growth ideas for?',
        'What are your primary goals for growth?',
        'How many growth ideas would you like?'
      ],
      examples: [
        'E-commerce',
        'Increase website traffic, improve conversion rate',
        '5'
      ],
      template: 'Generate {3} growth ideas for an {1} business with the primary goals of {2}.'
    },
    'KEYWORD EXTRACTOR': {
      questions: [
        'Paste the content you want to extract keywords from:',
        'How many keywords would you like to extract?'
      ],
      examples: [
        'In the world of digital marketing, search engine optimization plays a crucial role in driving organic traffic to websites.',
        '10'
      ],
      template: 'Extract {2} keywords from the following content: {1}.'
    },
    'LISTICLE IDEAS': {
      questions: [
        'What topic do you want the listicle ideas for?',
        'How many listicle ideas would you like?'
      ],
      examples: [
        'Digital marketing',
        '5'
      ],
      template: 'Generate {2} listicle ideas on the topic of {1}.'
    },
    'STARTUP IDEAS': {
      questions: [
        'What industry do you want the startup ideas for?',
        'How many startup ideas would you like?'
      ],
      examples: [
        'Healthcare',
        '5'
      ],
      template: 'Generate {2} startup ideas for the {1} industry.'
    },
    'TRANSLATE': {
      questions: [
        'What is the text you want to translate?',
        'What language do you want to translate the text into?'
      ],
      examples: [
        'Hello, how are you',
        'Spanish'
      ],
      template: 'Translate the following text from English to {2}: {1}'
    },
    'MAKE IT EASY-TO-READ': {
      questions: [
        'What is the text you want to make more reader-friendly?',
        'What is the target reading grade level?'
      ],
      examples: [
        'The complexities of quantum mechanics have befuddled even the most talented of scientists',
        '8'
      ],
      template: 'Rewrite the following text to make it easier to read and target a {2}th-grade reading level: {1}'
    },
    'POEM GENERATOR': {
      questions: [
        'What is the theme of the poem?',
        'What type of poem do you want?',
        'How many lines should the poem have?'
      ],
      examples: [
        'Nature',
        'Haiku, Limerick, Sonnet, Free Verse',
        '12'
      ],
      template: 'Create a {2} poem about {1} with {3} lines:'
    },
    'GENERAL NEWS RELEASE': {
      questions: [
        'What is the name of the company or Organization?',
        'What is the main headline or announcement?',
        'Please provide a brief description or overview of the news.',
        'Who is the primary spokesperson or contact person for this news?',
        'Where is the company or organization based?',
        'What is the date of the announcement?'
      ],
      examples: [
        'XYZ tech solutions',
        'Launch of the new AI-powered software',
        'XYZ Tech solutions, a leader in AI software, Is thrilled to announce...',
        'John Doe, CEO of XYZ Tech solutions',
        'New York, NY',
        'October 5, 2023'
      ],
      template: 'FOR IMMEDIATE RELEASE: {6}\n{2}\n{5} - {1} is excited to share a major update: {3}. For more details and inquiries regarding this announcement, please contact {4}.'
    },
    'EVENT PRESS RELEASE': {
      questions: [
        'What is the name of the event?',
        'Who is the organizer or host of the event?',
        'Where is the event taking place?',
        'What is the date for the event?',
        'What is the timing of the event?',
        'Provide a brief overview or description of the event.',
        'Who is the primary spokesperson or contact person for this event?',
        'Do you have a website or registration link for the event?'
      ],
      examples: [
        'Tech Innovators Conference 2024',
        'XYZ Tech solutions',
        'Los Angeles Convention Center',
        'April 10, 2024',
        '9:00 AM to 5:00 PM',
        'The Tech Innovators Conference 2024 promises to be the biggest gathering of tech enthusiasts, bringing together...',
        'Jane Smith, Event Coordinator',
        'www.eventwebsite.com'
      ],
      template: 'FOR IMMEDIATE RELEASE:\n{1}: A Must-Attend Event Hosted by {2}\n{3}, {4}, {5}\n{6}\nFor more details, to RSVP, or to schedule an interview about the event, please contact {7}. Event details and registration can also be found at {8}.'
    },
    'PRODUCT LAUNCH PRESS RELEASE': {
      questions: [
        'What is the name of the product/service being launched?',
        'Who is the manufacturer or provider of the product/service?',
        'Can you give a brief description of the product/service?',
        'What is the official launch date?',
        'Provide a detailed overview or features of the product/service.',
        'Who is the primary spokesperson or contact person for this product launch?',
        'Do you have a website or link with more information about the product/service?'
      ],
      examples: [
        'Superclean Vacuum',
        'ABC Home Appliances',
        'A vacuum that uses AI to detect and clean dirt effectively',
        'April 20, 2024',
        'The SuperClean Vacuum not only cleans efficiently, but its AI-driven sensors also ensure longer machine life...',
        'Jane Doe, Chief Marketing Officer',
        'www.supercleanvacuum.com'
      ],
      template: 'FOR IMMEDIATE RELEASE:\n\nIntroducing the {1}: A Game-Changer in Home Cleaning\nBrought to you by {2}, the {1} is set to revolutionize home cleaning. Slated for release on {4}, this innovative product offers: {3}. {5}\nFor more details, inquiries, or to schedule an interview about the product launch, please contact {6}. More information can also be found at {7}.'
    },
    'PARTNERSHIP OR COLLABORATION PRESS RELEASE': {
      questions: [
        'What is the name of the first entity involved in the partnership/collaboration?',
        'What is the name of the second entity involved in the partnership/collaboration?',
        'Provide a detailed overview or purpose of the partnership/collaboration.',
        'What is the official announcement or partnership date?',
        'Who is the primary spokesperson or contact person from the first entity?',
        'Who is the primary spokesperson or contact person from the second entity?',
        'Do you have a website or link with more information about the partnership/collaboration?'
      ],
      examples: [
        'TechStream Ltd',
        'GreenTech Innovations',
        'The partnership aims to develop sustainable AI solutions for the tech industry, focusing on energy-efficient algorithms and eco-friendly hardware designs.',
        'June 15, 2024',
        'John Smith, CEO of TechStream Ltd',
        'Jane Doe, CEO of GreenTech Innovations',
        'www.techstream-greentech-partnership.com'
      ],
      template: 'FOR IMMEDIATE RELEASE:\n{1} Joins Forces with {2} to Shape the Future\nWe are excited to announce a groundbreaking partnership between {1} and {2}. Set to commence on {4}, this alliance aims to: {3}.\nFor more insights, interviews, or details about this collaboration, interested parties can reach out to {5} from {1} or {6} from {2}. Further details about the partnership can be found at {7}.'
    },
    'AWARD ANNOUNCEMENT PRESS RELEASE': {
      questions: [
        'What is the name of the company or individual receiving the award?',
        'What is the name/title of the award or recognition received?',
        'Who/Which organization granted the award?',
        'Provide a brief description or reason for receiving the award.',
        'What is the date of the award announcement or ceremony?',
        'Who is the primary spokesperson or contact person from the company?',
        'Do you have a website or link with more details about the award or the achievement?'
      ],
      examples: [
        'TechStream Ltd',
        'Best Innovative Tech Solution of 2024',
        'The Global Tech Awards',
        'TechStream Ltd. has been recognized for its innovative approach in developing sustainable AI solutions, leading the industry in both creativity and eco-friendly initiatives.',
        'June 20, 2024',
        'John Smith, CEO of TechStream Ltd',
        'www.techstream-awards.com'
      ],
      template: 'FOR IMMEDIATE RELEASE:\n\n{1} Clinches the Prestigious {2}\nIn an outstanding acknowledgment of excellence, {1} has been honored with the {2} by {3}. This accolade, announced on {5}, recognizes {1} for {4}.\nFor further insights or interviews related to this achievement, media can approach {6}. More details about the award and the notable accomplishments of {1} can be accessed at {7}.'
    },
    'CRISIS OR ISSUE PRESS RELEASE': {
      questions: [
        'What is the name of the company or Organization addressing the crisis/issue?',
        'Can you provide a brief overview or issue at hand?',
        'What action has the company taken in response to the crisis/issue?',
        'What immediate next steps or solution are being provided to stakeholders or public?',
        'Who is the primary spokesperson or contact person from the company for this issue?',
        'Do you have a website or link or more detailed information or updates about the situation?'
      ],
      examples: [
        'Clearwater Corp',
        'On July 15, 2024, it was discovered that a batch of our bottled water products showed traces of a non-harmful, yet undetected substance.',
        'Upon immediate discovery, ClearWater Corp. ceased all shipments of the concerned batch and initiated a rigorous internal investigation.',
        'Customers who have purchased bottles from the affected batch can return them to the point of purchase for a full refund.',
        'Jane Doe, Chief Safety Officer of ClearWater Corp.',
        'www.clearwater-update.com'
      ],
      template: 'FOR IMMEDIATE RELEASE:\n\nStatement from {1} Regarding Recent Issue\n{1} wishes to address the situation concerning: {2}. In our commitment to transparency and upholding the trust of our stakeholders, we have promptly taken measures which include {3}. Further, {4}.\nFor media inquiries or more detailed information about our ongoing response, please reach out to {5}. Regular updates will also be posted on our dedicated page at {6}.'
    },
    'FINANCIAL OR EARNINGS PRESS RELEASE': {
      questions: [
        'What is the name of the company issuing the financial/earnings report?',
        'For which period or quarter is this financial report?',
        'What is the reported revenue for the specified period?',
        'What is the reported net income or profit for the specified period?',
        'Can you provide key highlights or significant factors contributing to the financial results?',
        'Who is the primary spokesperson or contact person for this financial report?',
        'Do you have a link to the detailed earnings report or announcement?'
      ],
      examples: [
        'TechFin Solutions',
        'Q3 2024',
        '$150 million',
        '$45 million',
        'Our growth in the Asian markets contributed significantly to our revenue.',
        'Jane Smith, Chief Financial Officer',
        'www.techfin-earnings.com/q3'
      ],
      template: 'FOR IMMEDIATE RELEASE:\n\n{1} Announces Financial Results for {2}\n{1}, a leading name in the industry, is pleased to announce financial results for {2}. The company reported revenues of {3} and a net income of {4}. One of the notable factors contributing to this performance is {5}.\nFor a more detailed breakdown of our financial results and further insights, interested parties are directed to our full report available at {7}. For media inquiries or further clarification, please contact {6}.'
    },
    'STAFF OR EXECUTIVE ANNOUNCEMENT PRESS RELEASE': {
      questions: [
        'What is the name of the company making the staff or executive announcement?',
        'Who is the individual being announced?',
        'What is the new or current position/title of the individual?',
        'What type of announcement is it?',
        'Who is the primary spokesperson or authority announcing the change?',
        'Can you provide some background or significant accomplishments of the individual being announced?',
        'Do you have a link or webpage dedicated to the announced individual\'s profile or achievement?'
      ],
      examples: [
        'TechFin Solutions',
        'Jane Smith',
        'Chief Financial Officer',
        'New Hire, Promotion',
        'John Doe, CEO of TechFin Solutions',
        'Jane Smith has over 15 years of experience in financial management and played a crucial role in our European expansion.',
        'www.techfin-executive/jane-smith'
      ],
      template: 'FOR IMMEDIATE RELEASE:\n\n{1} Announces {4} of {2} as {3}\n{1} is excited to share the {4} of {2} to the role of {3}. {6} This strategic move aligns with our company\'s growth and vision for the future.\nFor a more detailed profile and achievements of {2}, interested parties are directed to {7}. For media inquiries or further details, please contact {5}.'
    },
    'CHARITY OR COMMUNITY INVOLVEMENT PRESS RELEASE': {
      questions: [
        'What is the name of the company involved in the charitable or community activity?',
        'What is the name of the charity or Organization the company is partnering with or supporting?',
        'What is the specific charitable or community activity/event being highlighted?',
        'Where will the activity or event take place?',
        'When will the activity or event take place?',
        'Can you provide more details on the company\'s involvement or contribution?',
        'Who is the primary spokesperson or authority from the company speaking about the involvement?',
        'Do you have a link or webpage dedicated to the activity or event details?'
      ],
      examples: [
        'TechFin Solutions',
        'Save the Oceans Foundation',
        'Ocean cleanup drive',
        'San Francisco Bay Area',
        'April 25, 2023',
        'TechFin Solutions has pledged to donate $1 million to the cause and will also be sending a team of volunteers.',
        'John Doe, CEO of TechFin Solutions',
        'www.techfin-charity.com/ocean-drive'
      ],
      template: 'FOR IMMEDIATE RELEASE:\n\n{1} Teams Up with {2} for {3}\n{1} is proud to announce its collaboration with {2} for the upcoming {3} scheduled to take place in {4} on {5}. {6} This initiative underscores our commitment to giving back to the community and promoting positive change.\nFor more details about the event and our involvement, interested parties can visit {8}. For media inquiries or further details, please contact {7}.'
    },
    'LEGAL OR REGULATORY PRESS RELEASE': {
      questions: [
        'What is the name of the company affected by the legal or regulatory matter?',
        'Which legal or regulatory body is involved?',
        'Can you provide a brief description of the legal or regulatory matter?',
        'Who is the primary spokesperson or authority from the company addressing the matter?',
        'When was the official decision or announcement made?',
        'Can you provide more details or the company\'s response/actions regarding the matter?',
        'Is there a link or webpage where more detailed information about the matter can be found?'
      ],
      examples: [
        'TechGiant Corp',
        'U.S. Securities and Exchange Commission',
        'TechGiant Corp has reached a settlement agreement regarding data privacy concerns.',
        'Jane Doe, Chief Legal Officer at TechGiant Corp',
        'May 15, 2023',
        'As part of the agreement, the company will enhance its data protection mechanisms and undergo periodic audits.',
        'www.techgiant.com/legal-notice'
      ],
      template: 'FOR IMMEDIATE RELEASE:\n\n{1} Addresses Legal Matter with {2}\n{1} wishes to inform its stakeholders about a recent legal matter involving {2}. The matter pertains to: {3}. In response to this, {6} We remain committed to upholding the highest standards of transparency and accountability.\nFor more detailed information on this matter, please refer to our official notice at {7}. For media inquiries or further details, please contact {4}.'
    },
    'CONTENT WRITER': {
      questions: [
        'What is the original content you would like to rewrite?'
      ],
      examples: [
        'Your original content here'
      ],
      template: 'Rewrite the following content to create a fresh, new piece while retaining the core meaning and information: {1}.'
    },
    'EBOOK HEADLINES AND SUBHEADLINE': {
      questions: [
        'What is the main topic or theme of your ebook?',
        'What type of headline style do you prefer?'
      ],
      examples: [
        'A beginner\'s guide to mindfulness',
        'Intriguing, descriptive'
      ],
      template: 'Create a captivating ebook headline and subheadline based on the main topic of {1}. The headline should be in a {2} style, making it stand out and grab the attention of potential buyers. The subheadline should provide additional context or a compelling reason for the reader to explore the ebook further.'
    },
    'EBOOK INTRODUCTION': {
      questions: [
        'What is the title of your ebook?',
        'What is the main topic or niche of your ebook?',
        'Who is your target audience?',
        'What tone do you want for the introduction?'
      ],
      examples: [
        'Mastering Mindfulness: A journey to inner peace',
        'Health and wellness',
        'Beginners looking to practice mindfulness',
        'casual, confident'
      ],
      template: 'Write an engaging introduction for the ebook titled {1} that is focused on the {2} topic. The introduction should be written in a {4} tone, appealing to the target audience of {3}. It should capture the essence of the ebook and provide a brief overview of the content, while enticing readers to dive into the chapters that follow.'
    },
    'FIND A NICHE': {
      questions: [
        'What general industry or topic are you interested in?',
        'What specific subtopic or angle do you want to explore?',
        'How many niche ideas do you want?',
        'What level of competition are you looking for in a niche?'
      ],
      examples: [
        'Health and wellness',
        'Beginner yoga',
        '5',
        'Highly competitive, low competition'
      ],
      template: 'Generate {3} niche ideas within the {1} industry, specifically focusing on the subtopic of {2}. The niches should cater to different levels of competition, with a preference for {4} niches. The ideas should be unique, profitable, and have the potential to captivate an audience in the context of an ebook.'
    },
    'GET AN EBOOK IDEA': {
      questions: [
        'What is the niche or topic of your ebook?',
        'How many ebooks ideas do you want?'
      ],
      examples: [
        'Health and wellness',
        '3'
      ],
      template: 'Generate {2} captivating ebook ideas within the {1} niche. The ideas should be unique, engaging, and have the potential to attract a wide audience. Each concept should focus on a different aspect of the niche and offer value to the readers by addressing their needs, interests, or challenges.'
    },
    'PRODUCT FEATURES/BULLETS': {
      questions: [
        'What is the product?',
        'What are the key features or selling points of the product?',
        'How many bullet points do you want to create?'
      ],
      examples: [
        'smartphone',
        'fast processor, high-resolution camera, long battery life',
        '5'
      ],
      template: 'Create {3} compelling and informative bullet points for {1} that showcase its key features or selling points, such as {2}. These bullet points should be concise and easy to understand, highlighting the unique aspects of the product and enticing potential customers to explore further.'
    },
    'REFERENCE/ RECOMMENDATION LETTER': {
      questions: [
        'What is the name of the person you are writing the recommendation for?',
        'What is the purpose of the recommendation?',
        'What are the person\'s key strengths, skills, or qualities?',
        'How long have you known the person?',
        'In what capacity have you worked with or known the person?',
        'Please provide any specific details, anecdotes, or examples that demonstrate the person\'s strength, skills, or qualities.'
      ],
      examples: [
        'John Smith',
        'college admission, job application',
        'team player, strong leadership skills',
        '2 years',
        'Software Development Intern',
        'Specific examples of their work and achievements'
      ],
      template: 'Write a reference/recommendation letter for {1} in support of their {2}. Highlight their key strengths, skills, or qualities, such as {3}. Mention that you have known them for {4} and your relationship with them in the capacity of {5}. Be sure to include any specific details, anecdotes, or examples that {6}. This letter should be engaging, informative, and tailored to help the person succeed in their application or pursuit.'
    },
    'TIKTOK VIDEO SCRIPT': {
      questions: [
        'What is the main topic of your TikTok video?',
        'Who is the target audience for your video?',
        'What tone or style do you want for your video?',
        'What is the desired length of your TikTok video in seconds?'
      ],
      examples: [
        'Quick recipes',
        'Busy people who want to cook at home',
        'Casual, Creative',
        '30'
      ],
      template: 'Create an engaging script for a TikTok video on the topic of {1} targeted at the audience of {2}. The script should adopt a {3} tone or style and be approximately {4} seconds long. Make sure the content is captivating and attention-grabbing, considering the short format and time constraint of TikTok videos. The script should be concise, conveying the main message quickly and effectively to keep viewers interested and encourage them to follow your account for more content.'
    },
    'YOUTUBE DESCRIPTIONS': {
      questions: [
        'What is the title of your YouTube video?',
        'What is the main topic or theme of your YouTube video?',
        'What are some key points or highlights from the video?',
        'What call-to-action would you like to include in the description?'
      ],
      examples: [
        'Top 10 Travel Destinations',
        'Travel',
        'Travel tips, vacation spots, must-visit places',
        'Subscribe, like, and share'
      ],
      template: 'Create a captivating and search-optimized YouTube description for the video titled "{1}", which focuses on the topic of {2}. The description should provide a brief overview of the content, including key points or highlights such as {3}. Don\'t forget to include call-to-actions like {4} to encourage viewers to engage with the video and channel. Make sure the description is well-written and effectively communicates the value of the video to potential viewers, increasing the likelihood of clicks and watch time.'
    },
    'YOUTUBE HASTAGS': {
      questions: [
        'What is the main topic or theme of the YouTube video?',
        'How many hashtags would you like to generate?'
      ],
      examples: [
        'Fitness',
        '10'
      ],
      template: 'Generate {2} relevant and effective hashtags for a YouTube video with the main topic or theme of {1}. These hashtags should help the video gain more visibility and reach a larger audience when added to the video description. Make sure the hashtags are closely related to the content of the video and resonate with the target audience.'
    },
    'YOUTUBE HOOKS': {
      questions: [
        'What is the main topic or theme of your YouTube video?',
        'Who is the target audience for your video?'
      ],
      examples: [
        'Travel tips',
        'Beginner travelers'
      ],
      template: 'Create a catchy and attention-grabbing hook for a YouTube video focusing on the topic of {1} and targeting the audience of {2}. The hook should be compelling and make viewers eager to watch the video, ensuring they stay engaged and continue watching your content. It should also give them a hint of what to expect from the video, but without revealing too much, maintaining their curiosity and interest throughout.'
    },
    'YOUTUBE OUTLINES': {
      questions: [
        'What is the main topic of your YouTube video?',
        'Who is the target audience for your video?',
        'How many sections do you want in the outline?',
        'What tone or style do you want for your video?'
      ],
      examples: [
        '10 travel hacks',
        'Beginners travelers',
        '4',
        'Casual, confident'
      ],
      template: 'Create a detailed outline for a YouTube video on the topic of {1} targeted at the audience of {2}. The outline should have {3} sections and adopt a {4} tone or style. Each section should cover a different aspect of the main topic and be designed to guide the video creation process, resulting in a well-organized, informative, and engaging video for the viewers. The outline should also ensure that the content flows smoothly, keeping the audience captivated and encouraging them to watch the entire video.'
    },
    'YOUTUBE SHORTS': {
      questions: [
        'What is the main topic of your YouTube Short?',
        'Who is the target audience for your short?',
        'What tone or style do you want for your short?',
        'What is the desired length of your YouTube short in seconds?'
      ],
      examples: [
        'Easy yoga poses',
        'Beginner yoga enthusiasts',
        'Casual, Creative',
        '16'
      ],
      template: 'Create a captivating script for a YouTube Short on the topic of {1} targeted at the audience of {2}. The script should adopt a {3} tone or style and be approximately {4} seconds long. Ensure the content is engaging and attention-grabbing, keeping in mind the short format and time constraint of YouTube Shorts. The script should be concise, conveying the main message quickly and effectively to keep viewers interested and encourage them to watch more of your content.'
    },
    'YOUTUBE TAGS': {
      questions: [
        'What is the main topic or theme of the YouTube video?',
        'How many tags would you like to generate?'
      ],
      examples: [
        'Travel vlog',
        '15'
      ],
      template: 'Generate {2} relevant and effective tags for a YouTube video with the main topic or theme of {1}. These tags should help the video rank higher in search results and reach a larger audience. Make sure the tags are closely related to the content of the video and resonate with the target audience. Consider using a mix of broad and specific tags to increase the video\'s chances of being discovered by viewers with different interests.'
    },
    'YOUTUBE TITLES': {
      questions: [
        'What is the main topic or theme of the YouTube videos?',
        'How many video titles would you like to generate?',
        'What is the main purpose or tone of the videos?',
        'What keywords or phrases would you like to include in the titles?'
      ],
      examples: [
        'Productivity',
        '5',
        'Casual, creative',
        'working from home, time management'
      ],
      template: 'Generate {2} click-magnet YouTube video titles for videos focusing on the topic of {1}. The main purpose or tone of the videos should be {3}. Make sure to include the keywords or phrases {4} in the titles to help them rank higher on YouTube. The titles should be engaging, attention-grabbing, and encourage viewers to click on the videos.'
    },
    'PHYSICAL PRODUCT TEXT TO VIDEO': {
      questions: [
        'What is the name of the Product?',
        'Describe your Product?'
      ],
      examples: [
        'Example: under eye cream, Terry Crunchy Cakes',
        'Example: a snack good for children and adults of all ages'
      ],
      template: 'Position yourself as a professional video advert producer and a senior prompt engineer with 33 years of experience. I want you to create a text to video prompt for my {1} product. The video should be an hype video with affirmative tone. My product description:{2}.',
      note: 'Attach a quality picture of your product to chat in addition to the prompt'
    },
    'PHYSICAL PRODUCT PROMOTION VIDEO WITH VEO 3': {
      questions: [
        'What is your Product name?',
        'What is the Physical Product video description?',
        'What is the Total Video Duration?',
        'How many characters do you need in the video (multiple, 1, 2)?',
        'What Language should the voice over be?',
        'What Accent should the voice over have?',
        'How long should each character in video talk for?'
      ],
      examples: [
        'Example: Grace Luxury Necklace',
        'Example: A luxurious and ornate jewelry... -Get from physical product text to video',
        'Example: 24 seconds',
        'Example: multiple, 1, 2',
        'Example: English, French',
        'Example: Nigerian, Cowboy, Yoruba, Telugu',
        'Example: 5 seconds'
      ],
      template: 'Here is the description of the product image\n\n{2}\n\nI want the video to be a {3} video but each should be segmented to scenes of 8 seconds each because I want to use google veo3 and you know veo3 only produces 8 seconds video.\n\nMake it a continuous scene but splited so I can merge them together with a video editor. For example where a character ends its action and 8 seconds video elapsed, the next scene should continue with that story line without breaking the scene.\n\nI need like {4} characters interactive scene with each voice over speaking {5} of {6} accent and for each scene make sure you specify each character voice over to use but the voice over must correlate and flow with what will be in the other scenes. Make sure you utilise the entire 8 seconds video for each. but make sure for each scene, each character only use {7}.\n\nI need you to craft an award winning promotional marketing video script that will sell my {1} product. I do not need any text overlay on screen.\n\nMake the video and craft it based on your experience\n\nMake sure the video is hyped with hyper active characters'
    },
    'PHYSICAL PRODUCT SCENE-BY-SCENE NARRATIVE PROMOTION VIDEO WITH VEO 3': {
      questions: [
        'What is the Physical Product video description?',
        'What is the Total Video Duration?',
        'What Language should the voice over be?',
        'What Accent should the voice over have?',
        'How many Scenes do you want?',
        'Describe each Scene',
        'What Promotional message will Narrators say?'
      ],
      examples: [
        'Example: A luxurious and ornate jewelry... -Get from physical product text to video',
        'Example: 24 seconds',
        'Example: English, French',
        'Example: Nigerian, Cowboy, Yoruba, Telugu',
        'Example: 3',
        'Example: [0–2s] A cozy, well-lit Chinese home kitchen in the morning. A mother in her early 30s',
        'Example: "NeoLife Vita Squares is the perfect supplement for your child—keeping..Click to Order"'
      ],
      template: 'Scene Description ({2} total):\n\n{6}\n\nNarrator Voice-over (with {3} and a {4} accent, entire 8 seconds):\n\n{7}\n\nStyle & Mood Notes (for Veo3 engine):\nUse soft, natural daylight with warm tones.\n\nFamily-friendly atmosphere—clean, relatable, homely.\n\nSmooth transitions to keep pace with narration.\n\nEmphasize joy, health, and trust.\n\nImage description:\n{1}',
      numberQuestionIndex: 4, // Question 5 (0-indexed) should be a number input
      dynamicFieldIndex: 5, // Question 6 (0-indexed) should be dynamic
      dynamicFieldLabel: 'Scene' // Label for dynamic fields
    },
    'Company Bio': {
      questions: [
        'What is the company name?',
        'What industry is the company in?',
        'What are the main products or services?',
        'What is the company\'s mission?',
        'What tone should the bio use?'
      ],
      examples: ['TechCorp', 'Software development', 'Cloud solutions', 'Empowering businesses through technology', 'Professional'],
      template: 'Write a compelling company bio for {1}, a {2} company that specializes in {3}. The company\'s mission is {4}. The bio should be written in a {5} tone and highlight the company\'s expertise and value proposition.',
      tones: toneOptions,
      toneQuestionIndex: 4
    },
  };

const formTypes = Object.keys(formConfigs);

function PromptForm({ formTypeFilter }) {
  // Filter formTypes if a filter is provided
  const filteredFormTypes = formTypeFilter
    ? formTypes.filter(type => formTypeFilter.includes(type))
    : formTypes;

  const [formType, setFormType] = useState(filteredFormTypes[0]);
  const [fields, setFields] = useState([]);
  const [prompt, setPrompt] = useState('');

  const config = formConfigs[formType] || {};

  React.useEffect(() => {
    setFields(config.questions?.map((q, i) =>
      config.tones && config.toneQuestionIndex === i
        ? config.tones[0]
        : ''
    ) || []);
    setPrompt('');
  }, [formType]);

  const handleChange = (i, value) => {
    const newFields = [...fields];
    newFields[i] = value;
    setFields(newFields);
  };

  const generatePrompt = () => {
    // Replace {1}..{5} in template with answers
    let result = config.template;
    for (let i = 0; i < config.questions.length; i++) {
      let value = fields[i] || '';
      
      // Handle dynamic fields (arrays)
      if (Array.isArray(value)) {
        value = value.filter(v => v && v.trim()).join('\n\n');
      }
      
      result = result.replace(new RegExp(`\\{${i + 1}\\}`, 'g'), value);
    }
    setPrompt(result);
  };

  return (
    <div className="prompt-form-card">
      <div className="form-title-row">
        <select className="form-title-dropdown" value={formType} onChange={e => setFormType(e.target.value)}>
          {filteredFormTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <form className="prompt-form" onSubmit={e => e.preventDefault()}>
        {config.questions.map((q, i) => {
          // Handle dynamic fields (arrays)
          if (config.dynamicFieldIndex !== undefined && config.dynamicFieldIndex === i) {
            return (
              <div className="form-group" key={i}>
                <label className="form-label">{i + 1}. {q}</label>
                <div className="dynamic-fields">
                  {fields[i]?.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="dynamic-field">
                      <input
                        className="form-input"
                        type="text"
                        placeholder={`${config.dynamicFieldLabel || 'Field'} ${fieldIndex + 1}`}
                        value={field}
                        onChange={e => {
                          const newFields = [...fields];
                          newFields[i][fieldIndex] = e.target.value;
                          setFields(newFields);
                        }}
                      />
                      <button
                        type="button"
                        className="remove-field-btn"
                        onClick={() => {
                          const newFields = [...fields];
                          newFields[i] = newFields[i].filter((_, index) => index !== fieldIndex);
                          setFields(newFields);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-field-btn"
                    onClick={() => {
                      const newFields = [...fields];
                      if (!newFields[i]) newFields[i] = [];
                      newFields[i].push('');
                      setFields(newFields);
                    }}
                  >
                    Add {config.dynamicFieldLabel || 'Field'}
                  </button>
                </div>
              </div>
            );
          }
          
          // Handle regular fields
          return (
            <div className="form-group" key={i}>
              <label className="form-label">{i + 1}. {q}</label>
              {config.tones && config.toneQuestionIndex === i ? (
                <select
                  className="form-input"
                  value={fields[i] || config.tones[0]}
                  onChange={e => handleChange(i, e.target.value)}
                >
                  {config.tones.map(tone => <option key={tone}>{tone}</option>)}
                </select>
              ) : config.numberQuestionIndex !== undefined && config.numberQuestionIndex === i ? (
                <input
                  className="form-input"
                  type="number"
                  placeholder={config.examples[i]}
                  value={fields[i]}
                  onChange={e => handleChange(i, e.target.value)}
                />
              ) : (
                <input
                  className="form-input"
                  type="text"
                  placeholder={config.examples[i]}
                  value={fields[i]}
                  onChange={e => handleChange(i, e.target.value)}
                />
              )}
            </div>
          );
        })}
        {config.note && (
          <div className="form-group">
            <div className="form-note">
              <strong>Note:</strong> {config.note}
            </div>
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Prompt:</label>
          <textarea className="form-input" value={prompt} onChange={e => setPrompt(e.target.value)} rows={3} />
        </div>
        <div className="button-row">
          <button type="button" onClick={generatePrompt}>Generate Prompt</button>
          <button type="button" onClick={() => {
            if (prompt) {
              navigator.clipboard.writeText(prompt);
              alert('Prompt copied to clipboard!');
            }
          }}>Copy</button>
          <button type="button" onClick={() => {
            setFields(config.questions?.map((q, i) =>
              config.tones && config.toneQuestionIndex === i
                ? config.tones[0]
                : ''
            ) || []);
            setPrompt('');
          }}>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default PromptForm; 
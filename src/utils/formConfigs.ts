// Tone options for form templates
export const toneOptions = [
  'Formal', 'Informal', 'Professional', 'Conversational', 'Friendly', 'Witty', 'Funny', 'Serious', 'Sincere', 'Compassionate', 'Empathetic', 'Inspiring', 'Motivational', 'Authoritative', 'Persuasive', 'Calm', 'Reassuring', 'Excited', 'Energetic', 'Dramatic', 'Neutral', 'Objective', 'Analytical', 'Instructive', 'Explanatory', 'Academic', 'Corporate', 'Creative', 'Poetic', 'Romantic', 'Mysterious', 'Storytelling', 'Urgent', 'Casual', 'Playful', 'Bold', 'Direct', 'Warm', 'Thoughtful'
];

// Form configurations matching desktop app - BATCH 1
export const formConfigs: any = {
  'Linkedin ads': {
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
    toneQuestionIndex: 3,
    numberQuestionIndex: undefined
  },
  'Blog/Article Titles': {
    questions: [
      'What is the main topic?',
      'How many titles to generate?'
    ],
    examples: ['online marketing', '10'],
    template: 'Generate a list of {2} creative and captivating blog/article titles related to the main topic of {1}. Make sure the titles are engaging, thought-provoking, and tailored to attract the target audience\'s interest. Each title should reflect a unique aspect or perspective of the main topic, offering diverse content ideas for readers to explore.',
    tones: toneOptions,
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
    toneQuestionIndex: 1,
    numberQuestionIndex: 3
  },
  'BLOG/ARTICLE IDEAS': {
    questions: [
      'What is the main topic?',
      'What is the target audience?',
      'How many blog/article ideas would you like to generate?'
    ],
    examples: ['Email marketing', 'Small business owners', '5'],
    template: 'Generate a list of {3} unique and engaging blog/article ideas related to the main topic of {1} specifically tailored for the target audience of {2}. These ideas should be designed to generate traffic, leads, and sales by providing valuable information and insights to the readers. Each idea should cover a different aspect or angle of the main topic to offer a variety of content for readers to explore.',
    tones: toneOptions,
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
    template: 'Write an engaging introduction for a blog or article titled {1}, aimed at {2}. The introduction should be written in a {3} tone, capturing the reader\'s attention and providing a compelling reason to continue reading.',
    tones: toneOptions,
    toneQuestionIndex: 2
  },
  'BLOG/ARTICLE OUTLINES': {
    questions: [
      'What is the main topic of the blog/article?',
      'What is the target audience?',
      'How many sections do you want in the outlines?',
      'Tone of voice?',
      'What keywords do you want the article to rank for?'
    ],
    examples: ['social media marketing', 'start up founders', '4', 'Casual', 'social media strategy, startup social media, social media tips'],
    template: 'Create a detailed outline for a blog/article on the topic of {1} targeted at the audience of {2}. The outline should have {3} sections and adopt a {4} tone of voice. Make sure to incorporate the keywords {5} throughout the outline, ensuring the final piece is optimized for search engines. Each section should cover a different aspect of the main topic and be designed to guide the content creation process, resulting in a well-organized, informative, and engaging article for the readers.',
    tones: toneOptions,
    toneQuestionIndex: 3,
    numberQuestionIndex: 2
  },
  'SHORT BLOG/ARTICLE': {
    questions: [
      'Blog/Article main topic',
      'Your Main Niche Audience'
    ],
    examples: ['keyword research software', 'online marketers'],
    template: 'Write a compelling and engaging blog article on the topic of {1}, providing valuable insights and actionable tips for my readers. Make sure to include a strong introduction that grabs the reader\'s attention, well-researched points with relevant examples, and a conclusion that leaves a lasting impression. The tone should be informative, persuasive, and approachable. The audience is {2}. Please ensure the article is SEO-friendly and incorporates relevant keywords and phrases to enhance its online discoverability. In addition, suggest an SEO friendly title for the article.'
  },
  'GUARANTEES': {
    questions: [
      'What is the product or service?',
      'Who is the target audience?',
      'What is the main guarantee you would like to offer?',
      'How many additional guarantees or assurances do you want to include?'
    ],
    examples: [
      'Example: online language learning platform',
      'Example: language learners',
      'Example: 30-day money-back guarantee',
      'Example: 3'
    ],
    template: 'Write a compelling guarantee statement for the {1} targeted at {2}. Start with the main guarantee, which is {3}, and then include {4} additional guarantees or assurances that will boost the confidence of potential customers, making them more likely to commit to the product or service.'
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
  'FACEBOOK ADS': {
    questions: [
      'What is the product or service being advertised?',
      'What is the target audience for this ad?',
      'What is the call-to-action for this ad?',
      'What tone of voice should the ad use?',
      'What are the top 3 features or benefits of the product/service?'
    ],
    examples: [
      'Example: fitness app',
      'Example: people interested in fitness and exercise',
      'Example: download the app and start your fitness and exercise',
      'casual',
      'Example: easy-to-use, personalized plans, progress tracking'
    ],
    template: 'Write a captivating Facebook ad for the product or service {1}, targeted at the audience of {2}. The ad should adopt a {4} tone of voice and highlight the top 3 features or benefits: {5}. Make sure to include the call-to-action {3} to encourage viewers to take the desired action.',
    tones: toneOptions,
    toneQuestionIndex: 3,
    numberQuestionIndex: undefined
  },
  'GOOGLE ADS': {
    questions: [
      'What is the product or service being advertised?',
      'What is the target audience for this ad?',
      'What is the call-to-action for this ad?',
      'What tone of voice should the ad use?',
      'What are the top 3 features or benefits of the product/service?'
    ],
    examples: [
      'Example: online language learning platform',
      'Example: individuals looking to learn a new language',
      'Example: join now and unlock a world of languages',
      'casual',
      'Example: interactive lessons, native speaker audio, progress tracking'
    ],
    template: 'Write a compelling Google ad for the product or service {1}, targeted at the audience of {2}. The ad should adopt a {4} tone of voice and highlight the top 3 features or benefits: {5}. Make sure to include the call-to-action {3} to encourage viewers to take the desired action.',
    tones: toneOptions,
    toneQuestionIndex: 3,
    numberQuestionIndex: undefined
  },
  'GENERAL ADVERTISEMENT': {
    questions: [
      'What is the product or service being advertised?',
      'What is the target audience for this ad?',
      'What is the call-to-action for this ad?',
      'What tone of voice should the ad use?',
      'What are the top 3 features or benefits of the product/service?'
    ],
    examples: [
      'Example: fitness tracking app',
      'Example: fitness enthusiasts and health-conscious individuals',
      'Example: Download now and start your fitness journey today!',
      'casual',
      'Example: real-time activity tracking, personalized workout plans, social features'
    ],
    template: 'Write a versatile advertisement for the product or service {1}, targeted at the audience of {2}. The ad should adopt a {4} tone of voice and highlight the top 3 features or benefits: {5}. Make sure to include the call-to-action {3} to encourage viewers to take the desired action. The final ad copy should be adaptable for use across various platforms and media.',
    tones: toneOptions,
    toneQuestionIndex: 3,
    numberQuestionIndex: undefined
  },
  'LinkedIn Post': {
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
    template: 'Create a {3}-second short ad video script to promote the product or service {1}, targeted at the audience of {2}. The script should adopt a {4} tone of voice and incorporate the keywords or phrases {5} to effectively highlight the benefits and features of the product or service. The video should be engaging, attention-grabbing, and persuasive, using a clear call-to-action to encourage viewers to explore the product or service further or make a purchase.',
    tones: toneOptions,
    toneQuestionIndex: 3,
    numberQuestionIndex: 2
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
    template: 'Create an engaging script for a TikTok video on the topic of {1} targeted at the audience of {2}. The script should adopt a {3} tone or style and be approximately {4} seconds long. Make sure the content is captivating and attention-grabbing, considering the short format and time constraint of TikTok videos. The script should be concise, conveying the main message quickly and effectively to keep viewers interested and encourage them to follow your account for more content.',
    tones: toneOptions,
    toneQuestionIndex: 2
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
    template: 'Create {4} email subject lines that grab the attention of the recipient and encourage them to open the email. The subject lines should be aligned with the purpose of the email {1} and adopt a {2} tone of voice. Make sure to include the main highlight "{3}" or offer to create a sense of urgency and entice the recipient to read the email. The subject lines should be catchy, relevant, and optimized for driving open rates.',
    tones: toneOptions,
    toneQuestionIndex: 1
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
  'AMAZON SPONSORED BRANDS': {
    questions: [
      "What is the product you are advertising?",
      "What are the key features or selling points you want to highlight?",
      "What tone of voice should the ad use?"
    ],
    examples: [
      "Example: wireless headphones",
      "Example: Bluetooth, noise-cancelling, long battery life",
      "Example: confident, persuasive"
    ],
    template: 'Create a captivating Amazon Sponsored Brand Ad headline for the {1} that showcases its key features or selling points, such as {2}. The headline should adopt a {3} tone of voice, enticing potential customers to click on the ad and explore the product further. Keep the headline concise, easy to understand, and focused on the unique aspects of the product that will appeal to Amazon shoppers.',
    tones: toneOptions,
    toneQuestionIndex: 2
  },
  'AMAZON SPONSORED DISPLAY': {
    questions: [
      "What is the product you are advertising?",
      "What are the key features or benefits you want to highlight?",
      "What tone of voice should the ad use?"
    ],
    examples: [
      "Example: fitness tracker",
      "Example: heart rate monitoring, sleep tracking, waterproof",
      "Example: energetic, motivational"
    ],
    template: 'Create a compelling Amazon Sponsored Display ad for the {1} that highlights its key features or benefits, such as {2}. The ad should adopt a {3} tone of voice to engage potential customers and encourage them to click through to learn more about the product. Make the ad visually appealing and informative while maintaining Amazon\'s advertising guidelines.',
    tones: toneOptions,
    toneQuestionIndex: 2
  },
  'AMAZON PRODUCT DESCRIPTIONS': {
    questions: [
      "What is the product you are selling?",
      "What are the main features and benefits of the product?",
      "Who is your target audience?",
      "What tone of voice should the description use?"
    ],
    examples: [
      "Example: smart home security camera",
      "Example: HD video, night vision, motion detection, mobile app control",
      "Example: homeowners, tech enthusiasts",
      "Example: professional, trustworthy"
    ],
    template: 'Write a compelling Amazon product description for the {1} that highlights its main features and benefits, including {2}. The description should be tailored to the target audience of {3} and adopt a {4} tone of voice. Make sure the description is informative, persuasive, and optimized for Amazon\'s search algorithm while providing all the necessary details potential customers need to make a purchase decision.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'AMAZON BULLET POINTS': {
    questions: [
      "What is the product you are selling?",
      "What are the key features and benefits you want to highlight?",
      "How many bullet points do you want?"
    ],
    examples: [
      "Example: portable blender",
      "Example: compact design, powerful motor, easy cleaning, travel-friendly",
      "Example: 5"
    ],
    template: 'Create {3} compelling Amazon bullet points for the {1} that highlight its key features and benefits, such as {2}. Each bullet point should be concise, benefit-focused, and designed to convince potential customers to purchase the product. Make sure the bullet points are optimized for Amazon\'s search algorithm and clearly communicate the value proposition.',
    numberQuestionIndex: 2
  },
  'AMAZON A+ CONTENT': {
    questions: [
      "What is the product you are selling?",
      "What are the main features and benefits you want to highlight?",
      "Who is your target audience?",
      "What tone of voice should the content use?"
    ],
    examples: [
      "Example: premium coffee maker",
      "Example: programmable brewing, thermal carafe, strength control, auto-shutoff",
      "Example: coffee enthusiasts, busy professionals",
      "Example: sophisticated, premium"
    ],
    template: 'Create engaging Amazon A+ Content for the {1} that showcases its main features and benefits, including {2}. The content should be tailored to the target audience of {3} and adopt a {4} tone of voice. Design the A+ Content to enhance the product listing with compelling visuals, detailed feature explanations, and persuasive copy that helps customers understand the product\'s value and encourages them to make a purchase.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'AMAZON STORE FRONT': {
    questions: [
      "What is the name of your brand or store?",
      "What products or categories will you be featuring?",
      "Who is your target audience?",
      "What tone of voice should the storefront use?"
    ],
    examples: [
      "Example: EcoLife Essentials",
      "Example: sustainable home products, eco-friendly cleaning supplies, reusable items",
      "Example: environmentally conscious consumers",
      "Example: inspiring, trustworthy"
    ],
    template: 'Design an engaging Amazon Storefront for {1} that showcases your products and categories, including {2}. The storefront should be tailored to the target audience of {3} and adopt a {4} tone of voice. Create compelling product presentations, brand storytelling, and category organization that helps customers discover and purchase your products while building brand loyalty.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'AMAZON VIDEO SCRIPT': {
    questions: [
      "What is the product you are creating a video for?",
      "What are the key features and benefits you want to highlight?",
      "What tone of voice should the video script use?",
      "How long should the video be (in seconds)?"
    ],
    examples: [
      "Example: smart fitness watch",
      "Example: heart rate monitoring, GPS tracking, waterproof design, long battery life",
      "Example: energetic, motivational",
      "Example: 30"
    ],
    template: 'Write a compelling Amazon video script for the {1} that highlights its key features and benefits, including {2}. The script should adopt a {3} tone of voice and be approximately {4} seconds long. Create engaging content that demonstrates the product\'s value, addresses customer pain points, and encourages viewers to make a purchase. The script should be optimized for Amazon\'s video platform and designed to convert viewers into customers.',
    tones: toneOptions,
    toneQuestionIndex: 2
  },
  'AMAZON Q&A': {
    questions: [
      "What is the product you are creating Q&A content for?",
      "What are the most common customer questions about this product?",
      "How many Q&A pairs do you want to create?"
    ],
    examples: [
      "Example: wireless earbuds",
      "Example: battery life, sound quality, compatibility, warranty",
      "Example: 5"
    ],
    template: 'Create {3} Amazon Q&A pairs for the {1} that address common customer questions and concerns, such as {2}. Each Q&A should provide clear, helpful, and accurate information that helps potential customers make informed purchase decisions. Make sure the answers are comprehensive yet concise, and address the specific concerns that customers typically have about this type of product.',
    numberQuestionIndex: 2
  },
  'AMAZON REVIEW RESPONSE': {
    questions: [
      "What is the product being reviewed?",
      "What type of review is this (positive, negative, neutral)?",
      "What are the main points mentioned in the review?",
      "What tone of voice should the response use?"
    ],
    examples: [
      "Example: kitchen appliance",
      "Example: positive, negative, neutral",
      "Example: product quality, customer service, shipping speed",
      "Example: professional, helpful"
    ],
    template: 'Write a professional Amazon review response for the {1}. This is a {2} review that mentions {3}. The response should adopt a {4} tone of voice and address the customer\'s feedback appropriately. For positive reviews, express gratitude and encourage future purchases. For negative reviews, acknowledge the issue, apologize if necessary, and offer solutions or improvements. For neutral reviews, thank the customer and invite further feedback.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'AMAZON COMPETITOR ANALYSIS': {
    questions: [
      "What is your product?",
      "Who are your main competitors?",
      "What aspects do you want to analyze?"
    ],
    examples: [
      "Example: smart home security system",
      "Example: Ring, Nest, Arlo",
      "Example: pricing, features, customer reviews, market positioning"
    ],
    template: 'Conduct a comprehensive Amazon competitor analysis for the {1} against your main competitors: {2}. Analyze the following aspects: {3}. Provide insights into how your product compares, identify opportunities for differentiation, and suggest strategies to improve your competitive position on Amazon. Include specific recommendations for pricing, features, marketing, and customer service improvements.',
    tones: toneOptions
  },
  'AMAZON PPC CAMPAIGN': {
    questions: [
      "What is the product you are advertising?",
      "What is your target audience?",
      "What is your budget for the campaign?",
      "What are your main keywords?"
    ],
    examples: [
      "Example: organic skincare product",
      "Example: health-conscious women aged 25-45",
      "Example: $500 per month",
      "Example: organic skincare, natural beauty, clean beauty"
    ],
    template: 'Create a comprehensive Amazon PPC campaign strategy for the {1} targeting {2} with a budget of {3}. Focus on the main keywords: {4}. Design a campaign structure that includes automatic and manual campaigns, keyword research, bid strategies, and budget allocation. Provide specific recommendations for ad copy, targeting options, and optimization strategies to maximize ROI and drive sales.',
    tones: toneOptions
  },
  'AMAZON SEO OPTIMIZATION': {
    questions: [
      "What is the product you want to optimize?",
      "What are the main keywords you want to rank for?",
      "Who is your target audience?"
    ],
    examples: [
      "Example: wireless charging pad",
      "Example: wireless charger, fast charging, phone charger",
      "Example: tech-savvy consumers, smartphone users"
    ],
    template: 'Develop an Amazon SEO optimization strategy for the {1} targeting the keywords: {2}. The strategy should be tailored to the target audience of {3}. Provide specific recommendations for title optimization, bullet points, product descriptions, backend keywords, and other listing elements that will improve search visibility and conversion rates. Include best practices for Amazon\'s A9 algorithm and competitor analysis.',
    tones: toneOptions
  },
  'AMAZON CONVERSION OPTIMIZATION': {
    questions: [
      "What is the product you want to optimize for conversions?",
      "What is your current conversion rate?",
      "What are the main barriers to conversion?"
    ],
    examples: [
      "Example: premium coffee maker",
      "Example: 2.5%",
      "Example: high price point, complex features, limited reviews"
    ],
    template: 'Create an Amazon conversion optimization strategy for the {1} with a current conversion rate of {2}. Address the main barriers to conversion: {3}. Provide specific recommendations for improving product listings, pricing strategies, customer reviews, A+ Content, and other elements that will increase the likelihood of customers making a purchase. Include A/B testing suggestions and performance metrics to track improvements.',
    tones: toneOptions
  },
  'AMAZON INVENTORY MANAGEMENT': {
    questions: [
      "What type of products do you sell?",
      "What is your current inventory turnover rate?",
      "What are your main inventory challenges?"
    ],
    examples: [
      "Example: electronics and accessories",
      "Example: 4 times per year",
      "Example: seasonal demand, supplier delays, storage costs"
    ],
    template: 'Develop an Amazon inventory management strategy for {1} with a current turnover rate of {2}. Address the main inventory challenges: {3}. Provide recommendations for demand forecasting, reorder points, supplier relationships, storage optimization, and inventory tracking systems. Include strategies for managing seasonal fluctuations, reducing carrying costs, and maintaining optimal stock levels to maximize sales and profitability.',
    tones: toneOptions
  },
  'AMAZON CUSTOMER SERVICE': {
    questions: [
      "What type of products do you sell?",
      "What are the most common customer service issues?",
      "What is your target response time?"
    ],
    examples: [
      "Example: home and garden products",
      "Example: shipping delays, product defects, return requests",
      "Example: 24 hours"
    ],
    template: 'Create an Amazon customer service strategy for {1} that addresses the most common issues: {2}. The strategy should aim for a target response time of {3}. Develop comprehensive protocols for handling inquiries, complaints, returns, and refunds. Include templates for common responses, escalation procedures, and customer satisfaction monitoring. Focus on maintaining high seller ratings and positive customer feedback.',
    tones: toneOptions
  },
  'AMAZON BRAND REGISTRY': {
    questions: [
      "What is your brand name?",
      "What products do you sell under this brand?",
      "What are your brand protection goals?"
    ],
    examples: [
      "Example: EcoLife",
      "Example: sustainable home products, eco-friendly cleaning supplies",
      "Example: prevent counterfeiting, control product listings, build brand authority"
    ],
    template: 'Develop an Amazon Brand Registry strategy for {1} that covers your product line: {2}. Focus on achieving your brand protection goals: {3}. Provide guidance on trademark registration, brand registry enrollment, content optimization, and brand protection tools. Include strategies for building brand authority, controlling product listings, and preventing unauthorized sellers from affecting your brand reputation.',
    tones: toneOptions
  },
  'AMAZON FULFILLMENT STRATEGY': {
    questions: [
      "What type of products do you sell?",
      "What is your current fulfillment method?",
      "What are your fulfillment goals?"
    ],
    examples: [
      "Example: fashion accessories",
      "Example: FBA (Fulfillment by Amazon)",
      "Example: reduce costs, improve delivery speed, expand to new markets"
    ],
    template: 'Create an Amazon fulfillment strategy for {1} that evaluates your current method ({2}) and helps achieve your fulfillment goals: {3}. Compare FBA, FBM, and hybrid approaches based on your product characteristics, sales volume, and business objectives. Provide recommendations for inventory placement, shipping optimization, cost management, and scaling strategies to improve customer satisfaction and profitability.',
    tones: toneOptions
  },
  'SOCIAL MEDIA STRATEGY': {
    questions: [
      "What is your business or brand?",
      "Who is your target audience?",
      "What are your main social media goals?",
      "What tone of voice should your strategy use?"
    ],
    examples: [
      "Example: eco-friendly skincare brand",
      "Example: environmentally conscious women aged 25-40",
      "Example: increase brand awareness, drive website traffic, generate leads",
      "Example: authentic, inspiring"
    ],
    template: 'Develop a comprehensive social media strategy for {1} targeting {2}. Focus on achieving your main goals: {3}. The strategy should adopt a {4} tone of voice and include platform selection, content planning, posting schedules, engagement tactics, and performance metrics. Provide specific recommendations for each chosen platform and strategies for building an engaged community around your brand.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'SOCIAL MEDIA CONTENT CALENDAR': {
    questions: [
      "What is your business or brand?",
      "What platforms will you be posting on?",
      "How many posts per week do you want to create?",
      "What are your main content themes?"
    ],
    examples: [
      "Example: fitness coaching business",
      "Example: Instagram, Facebook, TikTok",
      "Example: 15",
      "Example: workout tips, nutrition advice, motivational content, client success stories"
    ],
    template: 'Create a detailed social media content calendar for {1} across the platforms: {2}. Plan for {3} posts per week focusing on your main content themes: {4}. Include a mix of content types (educational, entertaining, promotional, user-generated), optimal posting times, hashtag strategies, and engagement tactics. Design the calendar to maintain consistency while keeping content fresh and engaging.',
    numberQuestionIndex: 2
  },
  'SOCIAL MEDIA CAMPAIGN': {
    questions: [
      "What is the campaign objective?",
      "Who is your target audience?",
      "What platforms will you use?",
      "What is your campaign budget?",
      "What tone of voice should the campaign use?"
    ],
    examples: [
      "Example: product launch, brand awareness, lead generation",
      "Example: tech-savvy professionals aged 30-50",
      "Example: LinkedIn, Facebook, Instagram",
      "Example: $2000",
      "Example: professional, trustworthy"
    ],
    template: 'Design a comprehensive social media campaign for {1} targeting {2} across the platforms: {3}. The campaign has a budget of {4} and should adopt a {5} tone of voice. Include campaign messaging, creative assets, targeting strategies, ad formats, budget allocation, and performance tracking. Provide specific recommendations for each platform and strategies for maximizing ROI and achieving campaign objectives.',
    tones: toneOptions,
    toneQuestionIndex: 4
  },
  'SOCIAL MEDIA AUDIT': {
    questions: [
      "What is your business or brand?",
      "What platforms do you currently use?",
      "What are your main concerns or areas for improvement?"
    ],
    examples: [
      "Example: online education platform",
      "Example: Facebook, Instagram, LinkedIn, Twitter",
      "Example: low engagement, inconsistent posting, unclear brand voice"
    ],
    template: 'Conduct a comprehensive social media audit for {1} across the platforms: {2}. Address your main concerns: {3}. Analyze current performance, content quality, audience engagement, brand consistency, and competitive positioning. Provide specific recommendations for improving content strategy, posting frequency, audience targeting, and overall social media effectiveness.',
    tones: toneOptions
  },
  'SOCIAL MEDIA CRISIS MANAGEMENT': {
    questions: [
      "What type of business or brand is this?",
      "What is the nature of the crisis?",
      "Who is your target audience?",
      "What tone of voice should the response use?"
    ],
    examples: [
      "Example: restaurant chain",
      "Example: negative customer review, product recall, PR incident",
      "Example: existing customers, potential customers, stakeholders",
      "Example: transparent, apologetic, solution-focused"
    ],
    template: 'Develop a social media crisis management strategy for {1} addressing the crisis: {2}. The strategy should be tailored to your target audience of {3} and adopt a {4} tone of voice. Include immediate response protocols, messaging guidelines, escalation procedures, and reputation recovery strategies. Provide templates for different crisis scenarios and guidelines for maintaining brand integrity during challenging situations.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'SOCIAL MEDIA INFLUENCER STRATEGY': {
    questions: [
      "What is your business or brand?",
      "Who is your target audience?",
      "What is your influencer marketing budget?",
      "What type of influencers do you want to work with?"
    ],
    examples: [
      "Example: sustainable fashion brand",
      "Example: environmentally conscious millennials",
      "Example: $5000",
      "Example: micro-influencers, lifestyle bloggers, sustainability advocates"
    ],
    template: 'Create a social media influencer strategy for {1} targeting {2} with a budget of {3}. Focus on working with {4} influencers. Develop criteria for influencer selection, partnership guidelines, content requirements, compensation structures, and performance metrics. Include strategies for building authentic relationships, measuring ROI, and ensuring brand alignment across all influencer collaborations.',
    tones: toneOptions
  },
  'SOCIAL MEDIA ADVERTISING': {
    questions: [
      "What is your business or brand?",
      "What is your advertising objective?",
      "Who is your target audience?",
      "What is your advertising budget?",
      "What platforms will you advertise on?"
    ],
    examples: [
      "Example: online fitness coaching",
      "Example: lead generation, website traffic, brand awareness",
      "Example: fitness enthusiasts aged 25-45",
      "Example: $1500",
      "Example: Facebook, Instagram, TikTok"
    ],
    template: 'Develop a social media advertising strategy for {1} with the objective of {2}. Target {3} with a budget of {4} across the platforms: {5}. Include ad creative recommendations, targeting strategies, budget allocation, bidding strategies, and performance optimization tactics. Provide specific guidance for each platform and strategies for maximizing ad performance and ROI.',
    tones: toneOptions
  },
  'SOCIAL MEDIA ANALYTICS': {
    questions: [
      "What is your business or brand?",
      "What platforms do you want to analyze?",
      "What are your key performance indicators (KPIs)?"
    ],
    examples: [
      "Example: e-commerce store",
      "Example: Instagram, Facebook, Pinterest",
      "Example: engagement rate, follower growth, website traffic, conversion rate"
    ],
    template: 'Create a social media analytics framework for {1} across the platforms: {2}. Focus on tracking your key performance indicators: {3}. Develop reporting templates, data collection methods, analysis procedures, and actionable insights generation. Include recommendations for tools, metrics to monitor, and strategies for using analytics to improve social media performance.',
    tones: toneOptions
  },
  'SOCIAL MEDIA COMMUNITY MANAGEMENT': {
    questions: [
      "What is your business or brand?",
      "Who is your community?",
      "What are your community management goals?",
      "What tone of voice should you use with your community?"
    ],
    examples: [
      "Example: software company",
      "Example: developers, tech professionals, customers",
      "Example: increase engagement, provide support, build relationships",
      "Example: helpful, professional, friendly"
    ],
    template: 'Develop a social media community management strategy for {1} serving the community of {2}. Focus on achieving your goals: {3}. The strategy should adopt a {4} tone of voice and include engagement guidelines, response protocols, content curation, community guidelines, and relationship building tactics. Provide specific strategies for fostering positive interactions and maintaining an active, engaged community.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'SOCIAL MEDIA CONTENT STRATEGY': {
    questions: [
      "What is your business or brand?",
      "Who is your target audience?",
      "What are your content goals?",
      "What tone of voice should your content use?"
    ],
    examples: [
      "Example: wellness coaching",
      "Example: health-conscious individuals aged 30-50",
      "Example: educate, inspire, convert",
      "Example: warm, encouraging, authoritative"
    ],
    template: 'Create a comprehensive social media content strategy for {1} targeting {2}. Focus on achieving your content goals: {3}. The strategy should adopt a {4} tone of voice and include content pillars, content types, posting frequency, visual guidelines, and engagement tactics. Provide specific recommendations for creating valuable, shareable content that resonates with your audience and drives business objectives.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'SOCIAL MEDIA BRAND GUIDELINES': {
    questions: [
      "What is your business or brand?",
      "What are your brand values?",
      "Who is your target audience?",
      "What visual style do you want to maintain?"
    ],
    examples: [
      "Example: sustainable home goods",
      "Example: eco-friendly, quality, innovation, community",
      "Example: environmentally conscious homeowners",
      "Example: clean, modern, nature-inspired"
    ],
    template: 'Develop comprehensive social media brand guidelines for {1} that reflect your brand values: {2}. The guidelines should be tailored to your target audience of {3} and maintain a {4} visual style. Include voice and tone guidelines, visual standards, content themes, hashtag strategies, and platform-specific recommendations. Provide clear guidelines for maintaining brand consistency across all social media channels.',
    tones: toneOptions
  },
  'SOCIAL MEDIA GROWTH STRATEGY': {
    questions: [
      "What is your business or brand?",
      "What is your current follower count?",
      "What is your target follower count?",
      "What platforms do you want to grow on?"
    ],
    examples: [
      "Example: digital marketing agency",
      "Example: 2,500 followers",
      "Example: 10,000 followers",
      "Example: LinkedIn, Instagram, Twitter"
    ],
    template: 'Create a social media growth strategy for {1} to increase followers from {2} to {3} across the platforms: {4}. Include organic growth tactics, content optimization strategies, engagement techniques, collaboration opportunities, and paid promotion recommendations. Provide specific action plans for each platform and strategies for building an engaged, relevant audience that supports your business objectives.',
    tones: toneOptions
  },
  'SOCIAL MEDIA ENGAGEMENT STRATEGY': {
    questions: [
      "What is your business or brand?",
      "Who is your target audience?",
      "What are your engagement goals?",
      "What tone of voice should you use for engagement?"
    ],
    examples: [
      "Example: online course platform",
      "Example: lifelong learners, professionals seeking skills",
      "Example: increase comments, shares, saves, direct messages",
      "Example: helpful, encouraging, conversational"
    ],
    template: 'Develop a social media engagement strategy for {1} targeting {2}. Focus on achieving your engagement goals: {3}. The strategy should adopt a {4} tone of voice and include response protocols, engagement tactics, community building activities, and user-generated content strategies. Provide specific guidelines for fostering meaningful interactions and building relationships with your audience.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'SOCIAL MEDIA TRENDING STRATEGY': {
    questions: [
      "What is your business or brand?",
      "What platforms do you want to leverage trends on?",
      "What type of trends do you want to participate in?"
    ],
    examples: [
      "Example: food delivery service",
      "Example: TikTok, Instagram, Twitter",
      "Example: food trends, cultural moments, seasonal content"
    ],
    template: 'Create a social media trending strategy for {1} to leverage trends on the platforms: {2}. Focus on participating in {3} trends. Include trend identification methods, content adaptation strategies, timing guidelines, and brand safety considerations. Provide specific recommendations for staying relevant while maintaining brand authenticity and avoiding potential controversies.',
    tones: toneOptions
  },
  'SOCIAL MEDIA STORYTELLING': {
    questions: [
      "What is your business or brand?",
      "What is your brand story?",
      "Who is your target audience?",
      "What tone of voice should your storytelling use?"
    ],
    examples: [
      "Example: family-owned bakery",
      "Example: three generations of bakers, traditional recipes, community connection",
      "Example: local community, food enthusiasts, families",
      "Example: warm, nostalgic, authentic"
    ],
    template: 'Develop a social media storytelling strategy for {1} that shares your brand story: {2}. The strategy should be tailored to your target audience of {3} and adopt a {4} tone of voice. Include story themes, content formats, narrative arcs, and engagement tactics. Provide specific recommendations for creating compelling, authentic stories that connect with your audience and strengthen brand loyalty.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'EMAIL MARKETING STRATEGY': {
    questions: [
      "What is your business or brand?",
      "Who is your target audience?",
      "What are your email marketing goals?",
      "What tone of voice should your emails use?"
    ],
    examples: [
      "Example: online course platform",
      "Example: professionals seeking career advancement",
      "Example: increase course enrollments, build community, provide value",
      "Example: professional, encouraging, helpful"
    ],
    template: 'Develop a comprehensive email marketing strategy for {1} targeting {2}. Focus on achieving your goals: {3}. The strategy should adopt a {4} tone of voice and include list building tactics, email segmentation, content planning, automation workflows, and performance tracking. Provide specific recommendations for subject lines, email design, call-to-actions, and conversion optimization.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'EMAIL AUTOMATION WORKFLOW': {
    questions: [
      "What is your business or brand?",
      "What is the trigger for this automation?",
      "Who is the target audience for this workflow?",
      "What is the goal of this automation?"
    ],
    examples: [
      "Example: e-commerce store",
      "Example: new subscriber, abandoned cart, purchase",
      "Example: new customers, returning customers, VIP customers",
      "Example: welcome new subscribers, recover abandoned carts, increase repeat purchases"
    ],
    template: 'Create an email automation workflow for {1} triggered by {2}. The workflow should target {3} and aim to {4}. Design a series of emails that nurture the relationship, provide value, and guide recipients toward the desired action. Include timing recommendations, personalization strategies, and performance metrics to track the success of the automation.',
    tones: toneOptions
  },
  'EMAIL SUBJECT LINE OPTIMIZATION': {
    questions: [
      "What is the purpose of the email?",
      "Who is your target audience?",
      "What is the main offer or content?",
      "How many subject line variations do you want?"
    ],
    examples: [
      "Example: newsletter, product launch, special offer",
      "Example: existing customers, prospects, VIP members",
      "Example: 50% off sale, new product launch, exclusive content",
      "Example: 5"
    ],
    template: 'Create {4} optimized email subject lines for {1} targeting {2}. The subject lines should highlight the main offer or content: {3}. Focus on creating compelling, curiosity-driven subject lines that increase open rates while maintaining authenticity and avoiding spam triggers. Include A/B testing recommendations and best practices for each subject line variation.',
    numberQuestionIndex: 3
  },
  'EMAIL CONTENT TEMPLATE': {
    questions: [
      "What is the purpose of the email?",
      "Who is your target audience?",
      "What is the main message or offer?",
      "What tone of voice should the email use?"
    ],
    examples: [
      "Example: welcome email, product announcement, newsletter",
      "Example: new subscribers, existing customers, prospects",
      "Example: welcome to our community, new product launch, weekly tips",
      "Example: friendly, professional, enthusiastic"
    ],
    template: 'Create an email content template for {1} targeting {2}. The email should communicate the main message: {3} and adopt a {4} tone of voice. Include compelling subject line, engaging opening, clear value proposition, strong call-to-action, and professional closing. Design the template to be mobile-responsive and optimized for maximum engagement and conversion.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'EMAIL LIST SEGMENTATION': {
    questions: [
      "What is your business or brand?",
      "What types of customers do you have?",
      "What are your main segmentation goals?"
    ],
    examples: [
      "Example: fitness coaching business",
      "Example: beginners, intermediate, advanced, VIP clients",
      "Example: increase engagement, improve conversion rates, personalize content"
    ],
    template: 'Develop an email list segmentation strategy for {1} based on your customer types: {2}. Focus on achieving your segmentation goals: {3}. Create detailed segments based on behavior, demographics, purchase history, and engagement levels. Provide specific recommendations for segment-specific content, timing, and messaging that will improve email performance and customer relationships.',
    tones: toneOptions
  },
  'EMAIL CONVERSION OPTIMIZATION': {
    questions: [
      "What is your business or brand?",
      "What is your current email conversion rate?",
      "What are the main barriers to conversion?",
      "What type of emails do you send?"
    ],
    examples: [
      "Example: online store",
      "Example: 2.5%",
      "Example: unclear CTAs, poor mobile experience, lack of urgency",
      "Example: promotional, newsletter, transactional"
    ],
    template: 'Create an email conversion optimization strategy for {1} with a current conversion rate of {2}. Address the main barriers: {3} in your {4} emails. Provide specific recommendations for improving subject lines, email design, call-to-actions, personalization, and timing. Include A/B testing strategies and performance metrics to track improvements in open rates, click-through rates, and conversions.',
    tones: toneOptions
  },
  'EMAIL DELIVERABILITY STRATEGY': {
    questions: [
      "What is your business or brand?",
      "What is your current deliverability rate?",
      "What are your main deliverability challenges?"
    ],
    examples: [
      "Example: SaaS company",
      "Example: 85%",
      "Example: low engagement, high bounce rate, spam complaints"
    ],
    template: 'Develop an email deliverability strategy for {1} with a current deliverability rate of {2}. Address the main challenges: {3}. Provide recommendations for improving sender reputation, list hygiene, authentication, content quality, and engagement rates. Include best practices for avoiding spam filters, maintaining clean lists, and building strong sender reputation.',
    tones: toneOptions
  },
  'EMAIL A/B TESTING STRATEGY': {
    questions: [
      "What is your business or brand?",
      "What elements do you want to test?",
      "What is your testing budget?",
      "What are your testing goals?"
    ],
    examples: [
      "Example: online course platform",
      "Example: subject lines, send times, content, CTAs",
      "Example: $500",
      "Example: increase open rates, improve click-through rates, boost conversions"
    ],
    template: 'Create an email A/B testing strategy for {1} focusing on testing {2} with a budget of {3}. Aim to achieve your testing goals: {4}. Develop a systematic approach to testing, including hypothesis formation, test design, sample size calculation, statistical significance, and result analysis. Provide specific testing recommendations and best practices for each element.',
    tones: toneOptions
  },
  'EMAIL PERSONALIZATION STRATEGY': {
    questions: [
      "What is your business or brand?",
      "What customer data do you collect?",
      "What are your personalization goals?",
      "What tone of voice should personalized emails use?"
    ],
    examples: [
      "Example: e-commerce store",
      "Example: purchase history, browsing behavior, demographics",
      "Example: increase engagement, improve conversion, build loyalty",
      "Example: friendly, relevant, helpful"
    ],
    template: 'Develop an email personalization strategy for {1} using the customer data: {2}. Focus on achieving your personalization goals: {3}. The strategy should adopt a {4} tone of voice and include dynamic content, behavioral triggers, segmentation strategies, and data-driven recommendations. Provide specific examples of personalized content and best practices for maintaining authenticity.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'EMAIL FREQUENCY STRATEGY': {
    questions: [
      "What is your business or brand?",
      "Who is your target audience?",
      "What type of content do you send?",
      "What are your engagement goals?"
    ],
    examples: [
      "Example: content marketing agency",
      "Example: marketing professionals, business owners",
      "Example: blog posts, industry insights, case studies",
      "Example: maintain engagement, avoid unsubscribes, drive traffic"
    ],
    template: 'Create an email frequency strategy for {1} targeting {2}. The strategy should optimize sending frequency for your {3} content while achieving your engagement goals: {4}. Include recommendations for different audience segments, seasonal adjustments, content types, and engagement monitoring. Provide guidelines for finding the optimal balance between staying top-of-mind and avoiding email fatigue.',
    tones: toneOptions
  },
  'EMAIL MOBILE OPTIMIZATION': {
    questions: [
      "What is your business or brand?",
      "What percentage of your audience opens emails on mobile?",
      "What are your main mobile optimization challenges?"
    ],
    examples: [
      "Example: retail store",
      "Example: 65%",
      "Example: poor readability, slow loading, difficult navigation"
    ],
    template: 'Develop an email mobile optimization strategy for {1} where {2} of your audience opens emails on mobile devices. Address the main challenges: {3}. Provide specific recommendations for responsive design, mobile-friendly content, fast loading times, and touch-friendly elements. Include best practices for ensuring emails look great and function well across all mobile devices and email clients.',
    tones: toneOptions
  },
  'EMAIL COMPLIANCE STRATEGY': {
    questions: [
      "What is your business or brand?",
      "What regions do you operate in?",
      "What are your main compliance concerns?"
    ],
    examples: [
      "Example: global software company",
      "Example: US, EU, Canada, Australia",
      "Example: GDPR compliance, CAN-SPAM, consent management"
    ],
    template: 'Create an email compliance strategy for {1} operating in {2}. Address your main compliance concerns: {3}. Develop comprehensive guidelines for data protection, consent management, unsubscribe processes, and privacy policies. Include specific requirements for each region and best practices for maintaining compliance while building effective email marketing campaigns.',
    tones: toneOptions
  },
  'EMAIL ANALYTICS STRATEGY': {
    questions: [
      "What is your business or brand?",
      "What are your key email metrics?",
      "What are your reporting goals?"
    ],
    examples: [
      "Example: online education platform",
      "Example: open rate, click-through rate, conversion rate, revenue per email",
      "Example: track performance, optimize campaigns, demonstrate ROI"
    ],
    template: 'Develop an email analytics strategy for {1} focusing on your key metrics: {2}. Aim to achieve your reporting goals: {3}. Create comprehensive tracking systems, reporting dashboards, and analysis procedures. Include recommendations for tools, metrics to monitor, and strategies for using data to improve email performance and demonstrate return on investment.',
    tones: toneOptions
  },
  'EMAIL RETENTION STRATEGY': {
    questions: [
      "What is your business or brand?",
      "What is your current unsubscribe rate?",
      "What are the main reasons for unsubscribes?",
      "What tone of voice should retention emails use?"
    ],
    examples: [
      "Example: subscription service",
      "Example: 3.2%",
      "Example: too frequent emails, irrelevant content, poor timing",
      "Example: valuable, respectful, helpful"
    ],
    template: 'Create an email retention strategy for {1} with a current unsubscribe rate of {2}. Address the main reasons for unsubscribes: {3}. The strategy should adopt a {4} tone of voice and include re-engagement campaigns, preference centers, win-back strategies, and feedback collection. Provide specific tactics for reducing unsubscribes and maintaining engaged email lists.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'EMAIL RE-ENGAGEMENT CAMPAIGN': {
    questions: [
      "What is your business or brand?",
      "Who are your inactive subscribers?",
      "What is the goal of the re-engagement campaign?",
      "What tone of voice should the campaign use?"
    ],
    examples: [
      "Example: fitness app",
      "Example: subscribers who haven't opened emails in 3+ months",
      "Example: reactivate subscribers, clean email list, improve deliverability",
      "Example: friendly, non-pushy, valuable"
    ],
    template: 'Design an email re-engagement campaign for {1} targeting {2}. The campaign should aim to {3} and adopt a {4} tone of voice. Create a series of emails that provide value, remind subscribers of benefits, and offer incentives to re-engage. Include strategies for segmenting inactive subscribers, timing recommendations, and procedures for removing truly disengaged contacts.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'CONTENT MARKETING STRATEGY': {
    questions: [
      "What is your business or brand?",
      "Who is your target audience?",
      "What are your content marketing goals?",
      "What tone of voice should your content use?"
    ],
    examples: [
      "Example: B2B software company",
      "Example: marketing managers, business owners, decision makers",
      "Example: increase brand awareness, generate leads, establish thought leadership",
      "Example: professional, authoritative, helpful"
    ],
    template: 'Develop a comprehensive content marketing strategy for {1} targeting {2}. Focus on achieving your goals: {3}. The strategy should adopt a {4} tone of voice and include content planning, distribution channels, SEO optimization, and performance measurement. Provide specific recommendations for content types, publishing schedules, and strategies for creating valuable, shareable content that drives business objectives.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'CONTENT CALENDAR': {
    questions: [
      "What is your business or brand?",
      "What content types do you want to create?",
      "How many pieces of content per month?",
      "What are your main content themes?"
    ],
    examples: [
      "Example: health and wellness blog",
      "Example: blog posts, social media content, videos, infographics",
      "Example: 12",
      "Example: nutrition tips, workout routines, mental health, product reviews"
    ],
    template: 'Create a detailed content calendar for {1} featuring {2} content types. Plan for {3} pieces of content per month focusing on your main themes: {4}. Include content ideas, publishing dates, distribution channels, and promotion strategies. Design the calendar to maintain consistency while keeping content fresh and engaging for your target audience.',
    numberQuestionIndex: 2
  },
  'CONTENT AUDIT': {
    questions: [
      "What is your business or brand?",
      "What content do you currently have?",
      "What are your main audit goals?"
    ],
    examples: [
      "Example: e-commerce store",
      "Example: blog posts, product descriptions, social media content",
      "Example: identify gaps, improve SEO, update outdated content"
    ],
    template: 'Conduct a comprehensive content audit for {1} covering your existing content: {2}. Focus on achieving your audit goals: {3}. Analyze content performance, identify gaps, assess quality, and provide recommendations for content optimization, repurposing opportunities, and strategic improvements. Include specific action items for improving content effectiveness and ROI.',
    tones: toneOptions
  },
  'CONTENT REPURPOSING STRATEGY': {
    questions: [
      "What is your business or brand?",
      "What is your main piece of content?",
      "What are your repurposing goals?",
      "What platforms do you want to reach?"
    ],
    examples: [
      "Example: marketing agency",
      "Example: comprehensive blog post on digital marketing trends",
      "Example: increase reach, save time, maintain consistency",
      "Example: LinkedIn, Instagram, YouTube, podcast platforms"
    ],
    template: 'Create a content repurposing strategy for {1} based on your main piece of content: {2}. Focus on achieving your repurposing goals: {3} across the platforms: {4}. Develop multiple content formats, distribution strategies, and optimization techniques. Provide specific recommendations for adapting content for different platforms while maintaining brand consistency and maximizing reach.',
    tones: toneOptions
  },
  'CONTENT SEO OPTIMIZATION': {
    questions: [
      "What is your business or brand?",
      "What type of content are you optimizing?",
      "What are your target keywords?",
      "Who is your target audience?"
    ],
    examples: [
      "Example: online course platform",
      "Example: blog posts, landing pages, product descriptions",
      "Example: online learning, skill development, career advancement",
      "Example: professionals seeking career growth, lifelong learners"
    ],
    template: 'Develop a content SEO optimization strategy for {1} focusing on {2} content. Target the keywords: {3} for your audience of {4}. Provide specific recommendations for keyword research, on-page optimization, content structure, internal linking, and technical SEO improvements. Include best practices for creating content that ranks well and drives organic traffic.',
    tones: toneOptions
  },
  'CONTENT DISTRIBUTION STRATEGY': {
    questions: [
      "What is your business or brand?",
      "What type of content do you create?",
      "Who is your target audience?",
      "What are your distribution goals?"
    ],
    examples: [
      "Example: SaaS company",
      "Example: blog posts, whitepapers, case studies, videos",
      "Example: B2B decision makers, IT professionals",
      "Example: increase brand awareness, generate leads, drive website traffic"
    ],
    template: 'Create a comprehensive content distribution strategy for {1} featuring {2} content targeting {3}. Focus on achieving your distribution goals: {4}. Develop multi-channel distribution plans, promotion tactics, and audience engagement strategies. Provide specific recommendations for each distribution channel and tactics for maximizing content reach and impact.',
    tones: toneOptions
  },
  'CONTENT PERFORMANCE ANALYSIS': {
    questions: [
      "What is your business or brand?",
      "What content do you want to analyze?",
      "What are your key performance metrics?"
    ],
    examples: [
      "Example: digital marketing agency",
      "Example: blog posts, social media content, email campaigns",
      "Example: page views, engagement rate, conversion rate, time on page"
    ],
    template: 'Conduct a content performance analysis for {1} covering {2}. Focus on tracking your key metrics: {3}. Develop comprehensive reporting frameworks, data collection methods, and analysis procedures. Provide specific insights and recommendations for improving content performance, optimizing for better results, and demonstrating content marketing ROI.',
    tones: toneOptions
  },
  'CONTENT PERSONALIZATION STRATEGY': {
    questions: [
      "What is your business or brand?",
      "What customer segments do you have?",
      "What are your personalization goals?",
      "What tone of voice should personalized content use?"
    ],
    examples: [
      "Example: e-commerce store",
      "Example: new customers, returning customers, VIP customers",
      "Example: increase engagement, improve conversion, build loyalty",
      "Example: relevant, helpful, conversational"
    ],
    template: 'Develop a content personalization strategy for {1} targeting your customer segments: {2}. Focus on achieving your personalization goals: {3}. The strategy should adopt a {4} tone of voice and include dynamic content, behavioral targeting, and segment-specific messaging. Provide specific examples of personalized content and best practices for maintaining authenticity.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'CONTENT CONVERSION OPTIMIZATION': {
    questions: [
      "What is your business or brand?",
      "What is your current content conversion rate?",
      "What are the main barriers to conversion?",
      "What type of content do you create?"
    ],
    examples: [
      "Example: online course platform",
      "Example: 2.8%",
      "Example: unclear CTAs, poor user experience, weak value proposition",
      "Example: blog posts, landing pages, email content"
    ],
    template: 'Create a content conversion optimization strategy for {1} with a current conversion rate of {2}. Address the main barriers: {3} in your {4} content. Provide specific recommendations for improving content structure, call-to-actions, user experience, and value proposition. Include A/B testing strategies and performance metrics to track improvements.',
    tones: toneOptions
  },
  'CONTENT BRAND GUIDELINES': {
    questions: [
      "What is your business or brand?",
      "What are your brand values?",
      "Who is your target audience?",
      "What visual style do you want to maintain?"
    ],
    examples: [
      "Example: sustainable fashion brand",
      "Example: eco-friendly, quality, innovation, community",
      "Example: environmentally conscious consumers",
      "Example: clean, modern, nature-inspired"
    ],
    template: 'Develop comprehensive content brand guidelines for {1} that reflect your brand values: {2}. The guidelines should be tailored to your target audience of {3} and maintain a {4} visual style. Include voice and tone guidelines, content standards, visual elements, and platform-specific recommendations. Provide clear guidelines for maintaining brand consistency across all content channels.',
    tones: toneOptions
  },
  'CONTENT EDITORIAL CALENDAR': {
    questions: [
      "What is your business or brand?",
      "What content formats do you publish?",
      "How many pieces of content per week?",
      "What are your main content themes?"
    ],
    examples: [
      "Example: tech blog",
      "Example: blog posts, videos, podcasts, infographics",
      "Example: 5",
      "Example: industry trends, product reviews, how-to guides, expert interviews"
    ],
    template: 'Create a detailed editorial calendar for {1} featuring {2} content formats. Plan for {3} pieces of content per week focusing on your main themes: {4}. Include content ideas, publishing schedules, responsible team members, and promotion strategies. Design the calendar to maintain consistency while keeping content fresh and engaging for your target audience.',
    numberQuestionIndex: 2
  },
  'CONTENT QUALITY ASSURANCE': {
    questions: [
      "What is your business or brand?",
      "What type of content do you create?",
      "What are your quality standards?",
      "What is your review process?"
    ],
    examples: [
      "Example: healthcare company",
      "Example: blog posts, whitepapers, social media content",
      "Example: accuracy, clarity, brand alignment, SEO optimization",
      "Example: writer review, editor review, stakeholder approval"
    ],
    template: 'Develop a content quality assurance process for {1} covering {2} content. Establish quality standards: {3} and implement a review process: {4}. Create comprehensive guidelines for content creation, editing procedures, approval workflows, and quality metrics. Include specific checklists and best practices for ensuring high-quality, consistent content.',
    tones: toneOptions
  },
  'CONTENT COLLABORATION STRATEGY': {
    questions: [
      "What is your business or brand?",
      "Who are your content collaborators?",
      "What are your collaboration goals?",
      "What tone of voice should collaborative content use?"
    ],
    examples: [
      "Example: marketing agency",
      "Example: industry experts, influencers, clients",
      "Example: increase reach, build relationships, create diverse content",
      "Example: professional, collaborative, authentic"
    ],
    template: 'Create a content collaboration strategy for {1} working with {2}. Focus on achieving your collaboration goals: {3}. The strategy should adopt a {4} tone of voice and include partnership guidelines, content co-creation processes, and distribution strategies. Provide specific recommendations for maintaining brand consistency while leveraging partner expertise and audiences.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'CONTENT MONETIZATION STRATEGY': {
    questions: [
      "What is your business or brand?",
      "What type of content do you create?",
      "Who is your target audience?",
      "What are your monetization goals?"
    ],
    examples: [
      "Example: educational platform",
      "Example: courses, webinars, ebooks, premium content",
      "Example: professionals seeking skills, lifelong learners",
      "Example: generate revenue, build membership, create passive income"
    ],
    template: 'Develop a content monetization strategy for {1} featuring {2} content targeting {3}. Focus on achieving your monetization goals: {4}. Create comprehensive plans for premium content, membership models, advertising opportunities, and affiliate partnerships. Provide specific recommendations for pricing strategies, value proposition, and conversion optimization.',
    tones: toneOptions
  },
  'CONTENT ACCESSIBILITY STRATEGY': {
    questions: [
      "What is your business or brand?",
      "What type of content do you create?",
      "Who is your target audience?",
      "What accessibility standards do you want to meet?"
    ],
    examples: [
      "Example: educational institution",
      "Example: videos, articles, presentations, interactive content",
      "Example: diverse learners, including those with disabilities",
      "Example: WCAG 2.1 AA, Section 508, ADA compliance"
    ],
    template: 'Create a content accessibility strategy for {1} covering {2} content targeting {3}. Focus on meeting accessibility standards: {4}. Develop comprehensive guidelines for creating accessible content, including alt text, captions, screen reader compatibility, and keyboard navigation. Provide specific recommendations for ensuring all content is accessible to diverse audiences.',
    tones: toneOptions
  },
  'PRESS RELEASE': {
    questions: [
      'What is the name of the company or organization?',
      'What is the main announcement or news?',
      'Who is the primary spokesperson?',
      'What is the key message or takeaway?',
      'When is the announcement date?',
      'What is the contact information for media inquiries?'
    ],
    examples: [
      'Example: TechCorp Inc.',
      'Example: Launch of new AI-powered software',
      'Example: John Smith, CEO',
      'Example: Revolutionary technology that will transform the industry',
      'Example: March 15, 2024',
      'Example: press@techcorp.com, (555) 123-4567'
    ],
    template: 'FOR IMMEDIATE RELEASE\n\n{1} Announces {2}\n\n{1} is pleased to announce {2}. {4}\n\nAccording to {3}, "This represents a significant milestone for our company and our customers."\n\nFor media inquiries, please contact: {6}\n\nRelease Date: {5}'
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
    template: 'Write an engaging introduction for the ebook titled {1} that is focused on the {2} topic. The introduction should be written in a {4} tone, appealing to the target audience of {3}. It should capture the essence of the ebook and provide a brief overview of the content, while enticing readers to dive into the chapters that follow.',
    tones: toneOptions,
    toneQuestionIndex: 3
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
    template: 'Create an engaging script for a TikTok video on the topic of {1} targeted at the audience of {2}. The script should adopt a {3} tone or style and be approximately {4} seconds long. Make sure the content is captivating and attention-grabbing, considering the short format and time constraint of TikTok videos. The script should be concise, conveying the main message quickly and effectively to keep viewers interested and encourage them to follow your account for more content.',
    tones: toneOptions,
    toneQuestionIndex: 2
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
  'YOUTUBE HASHTAGS': {
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
      'Beginner travelers',
      '4',
      'Casual, confident'
    ],
    template: 'Create a detailed outline for a YouTube video on the topic of {1} targeted at the audience of {2}. The outline should have {3} sections and adopt a {4} tone or style. Each section should cover a different aspect of the main topic and be designed to guide the video creation process, resulting in a well-organized, informative, and engaging video for the viewers. The outline should also ensure that the content flows smoothly, keeping the audience captivated and encouraging them to watch the entire video.',
    tones: toneOptions,
    toneQuestionIndex: 3
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
    template: 'Create a captivating script for a YouTube Short on the topic of {1} targeted at the audience of {2}. The script should adopt a {3} tone or style and be approximately {4} seconds long. Ensure the content is engaging and attention-grabbing, keeping in mind the short format and time constraint of YouTube Shorts. The script should be concise, conveying the main message quickly and effectively to keep viewers interested and encourage them to watch more of your content.',
    tones: toneOptions,
    toneQuestionIndex: 2
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
    template: 'Generate {2} click-magnet YouTube video titles for videos focusing on the topic of {1}. The main purpose or tone of the videos should be {3}. Make sure to include the keywords or phrases {4} in the titles to help them rank higher on YouTube. The titles should be engaging, attention-grabbing, and encourage viewers to click on the videos.',
    tones: toneOptions,
    toneQuestionIndex: 2,
    numberQuestionIndex: 1
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
    template: 'Create a {3}-second video script to promote the physical product {1}, targeted at the audience of {2}. The script should adopt a {4} tone of voice and incorporate the keywords or phrases {5} to effectively showcase the benefits and features of the physical product. The video should be engaging, attention-grabbing, and clearly demonstrate how the product can improve the user\'s experience or solve a specific problem. Use a compelling call-to-action to encourage viewers to explore the product further or make a purchase.',
    tones: toneOptions,
    toneQuestionIndex: 3
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
    template: 'Position yourself as a professional video advert producer and a senior prompt engineer with 33 years of experience. I want you to create a text to video prompt for my {1} product. The video should be an hype video with affirmative tone. My product description: {2}.',
    note: 'Note: Attach a clear picture of your product in the chat along with the prompt'
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
    template: 'Here is the description of the product image\n\n{2}\n\nI want the video to be a {3} video but each should be segmented to scenes of 8 seconds each because I want to use google veo3 and you know veo3 only produces 8 seconds video.\n\nMake it a continuous scene but splited so I can merge them together with a video editor. For example where a character ends its action and 8 seconds video elapsed, the next scene should continue with that story line without breaking the scene.\n\nI need like {4} characters interactive scene with each voice over speaking {5} of {6} accent and for each scene make sure you specify each character voice over to use but the voice over must correlate and flow with what will be in the other scenes. Make sure you utilise the entire 8 seconds video for each. but make sure for each scene, each character only use {7}.\n\nI need you to craft an award winning promotional marketing video script that will sell my {1} product. I do not need any text overlay on screen.\n\nMake the video and craft it based on your experience\n\nMake sure the video is hyped with hyper active characters',
    numberQuestionIndex: 2
  },
  'PHYSICAL PRODUCT SCENE-BY-SCENE NARRATIVE PROMOTION VIDEO WITH VEO 3': {
    questions: [
      'What is the Physical Product video description?',
      'What is the Total Video Duration?',
      'What Language should the voice over be?',
      'What Accent should the voice over have?',
      'How many Scenes do you want?',
      'Describe each Scene'
    ],
    examples: [
      'Example: A luxurious and ornate jewelry... -Get from physical product text to video',
      'Example: 24 seconds',
      'Example: English, French',
      'Example: Nigerian, Cowboy, Yoruba, Telugu',
      'Example: 3',
      'Example: [0–2s] A cozy, well-lit Chinese home kitchen in the morning. A mother in her early 30s'
    ],
    template: 'Scene Description ({2} total):\n\n{6}\n\nNarrator Voice-over (with {3} and a {4} accent, entire 8 seconds):\n\n{7}\n\nStyle & Mood Notes (for Veo3 engine):\nUse soft, natural daylight with warm tones.\n\nFamily-friendly atmosphere—clean, relatable, homely.\n\nSmooth transitions to keep pace with narration.\n\nEmphasize joy, health, and trust.\n\nImage description:\n{1}',
    numberQuestionIndex: 1
  },
  // Ebook Category Form Types
  'find_niche': {
    questions: [
      'What industry or topic are you interested in?',
      'What is your target audience?',
      'What problems do you want to solve?'
    ],
    examples: [
      'Example: health and wellness',
      'Example: busy professionals aged 25-45',
      'Example: stress management, work-life balance'
    ],
    template: 'Find a profitable niche in the {1} industry targeting {2}. Focus on solving these problems: {3}. Provide specific niche ideas with market potential and audience size.',
    tones: toneOptions,
    toneQuestionIndex: undefined
  },
  'ebook_idea': {
    questions: [
      'What niche or topic are you focusing on?',
      'Who is your target audience?',
      'What problems does your audience face?',
      'How many ebook ideas do you want?'
    ],
    examples: [
      'Example: personal finance',
      'Example: millennials with student debt',
      'Example: budgeting, saving for retirement',
      'Example: 5'
    ],
    template: 'Generate {4} compelling ebook ideas for the {1} niche targeting {2}. Focus on solving these problems: {3}. Each idea should have a clear value proposition and market potential.',
    tones: toneOptions,
    numberQuestionIndex: 3
  },
  'create_chapters_toc': {
    questions: [
      'What is the main topic of your ebook?',
      'Who is your target audience?',
      'How many chapters do you want?',
      'What are the main themes or sections?'
    ],
    examples: [
      'Example: digital marketing for beginners',
      'Example: small business owners',
      'Example: 8',
      'Example: SEO, social media, email marketing, content creation'
    ],
    template: 'Create a detailed table of contents with {3} chapters for an ebook about {1} targeting {2}. Include these main themes: {4}. Each chapter should have clear learning objectives and subtopics.',
    tones: toneOptions,
    numberQuestionIndex: 2
  },
  'create_chapters': {
    questions: [
      'What is the main topic or niche of your ebook?',
      'Who is your target audience?',
      'How many chapters do you want in your ebook?',
      'Please provide a brief description of each chapter or section in your book.'
    ],
    examples: [
      'Example: health and wellness',
      'Example: beginners looking to practice meditation',
      'Example: 8',
      'Example: Introduction: A Beginner\'s Guide to Meditation, Chapter 1: Understanding Mindfulness'
    ],
    template: 'Write detailed chapters for an ebook about {1} targeting {2}. Create {3} comprehensive chapters based on this structure: {4}. Each chapter should be engaging, informative, and provide actionable value to readers.',
    tones: toneOptions,
    numberQuestionIndex: 2
  },
  'ebook_conclusion': {
    questions: [
      'What is the main topic of your ebook?',
      'What are the key takeaways from your ebook?',
      'What action do you want readers to take?',
      'What tone should the conclusion have?'
    ],
    examples: [
      'Example: digital marketing strategies',
      'Example: consistent posting, audience engagement, analytics tracking',
      'Example: implement the strategies and join our community',
      'Example: inspiring and motivational'
    ],
    template: 'Write a powerful conclusion for an ebook about {1}. Summarize the key takeaways: {2}. Include a compelling call-to-action: {3}. Use a {4} tone to inspire readers to take action.',
    tones: toneOptions,
    toneQuestionIndex: 3
  },
  'create_disclaimer': {
    questions: [
      'What type of content is this disclaimer for?',
      'What are the main disclaimers you need to include?',
      'What is the tone of your content?'
    ],
    examples: [
      'Example: health and fitness advice',
      'Example: consult healthcare provider, results may vary',
      'Example: professional but friendly'
    ],
    template: 'Create a legal disclaimer for {1} content. Include these disclaimers: {2}. Match the {3} tone of your content while ensuring legal protection.',
    tones: toneOptions,
    toneQuestionIndex: 2
  },
  'ebook_cta': {
    questions: [
      'What is the main topic of your ebook?',
      'What specific action do you want readers to take?',
      'How many call-to-actions do you want?',
      'What tone of voice should the CTAs use?'
    ],
    examples: [
      'Example: weight loss strategies',
      'Example: download free meal plan, join coaching program',
      'Example: 3',
      'Example: urgent and compelling'
    ],
    template: 'Create {3} compelling call-to-actions for an ebook about {1}. The desired actions are: {2}. Use a {4} tone to motivate readers to take action.',
    tones: toneOptions,
    toneQuestionIndex: 3,
    numberQuestionIndex: 2
  },
  'ebook_author_bio': {
    questions: [
      'What is your name or pen name?',
      'What are your credentials or expertise?',
      'What is the topic of your ebook?',
      'What tone should the bio have?'
    ],
    examples: [
      'Example: Sarah Johnson',
      'Example: certified nutritionist with 10 years experience',
      'Example: healthy eating habits',
      'Example: professional and trustworthy'
    ],
    template: 'Write an engaging author bio for {1}, a {2} expert. The bio should establish credibility for writing about {3} and use a {4} tone to build trust with readers.',
    tones: toneOptions,
    toneQuestionIndex: 3
  }
};

// ------- Aliases to keep Mobile in sync with Desktop names/IDs -------
// Video Scripts aliases (names and IDs used by ScriptsScreen)
formConfigs['YouTube Script'] = formConfigs['YOUTUBE SCRIPT'];
formConfigs['youtube_script'] = formConfigs['YOUTUBE SCRIPT'];
formConfigs['YouTube Titles'] = formConfigs['YOUTUBE TITLES'];
formConfigs['youtube_titles'] = formConfigs['YOUTUBE TITLES'];
formConfigs['YouTube Hooks'] = formConfigs['YOUTUBE HOOKS'];
formConfigs['youtube_hooks'] = formConfigs['YOUTUBE HOOKS'];
formConfigs['YouTube Outlines'] = formConfigs['YOUTUBE OUTLINES'];
formConfigs['youtube_outlines'] = formConfigs['YOUTUBE OUTLINES'];
formConfigs['YouTube Shorts'] = formConfigs['YOUTUBE SHORTS'];
formConfigs['youtube_shorts'] = formConfigs['YOUTUBE SHORTS'];
formConfigs['YouTube Descriptions'] = formConfigs['YOUTUBE DESCRIPTIONS'];
formConfigs['youtube_descriptions'] = formConfigs['YOUTUBE DESCRIPTIONS'];
formConfigs['YouTube Hashtags'] = formConfigs['YOUTUBE HASHTAGS'];
formConfigs['youtube_hashtags'] = formConfigs['YOUTUBE HASHTAGS'];
formConfigs['YouTube Tags'] = formConfigs['YOUTUBE TAGS'];
formConfigs['youtube_tags'] = formConfigs['YOUTUBE TAGS'];
formConfigs['TikTok Video Script'] = formConfigs['TIKTOK VIDEO SCRIPT'];
formConfigs['tiktok_video_script'] = formConfigs['TIKTOK VIDEO SCRIPT'];
formConfigs['TikTok Video Hooks'] = formConfigs['TIKTOK VIDEO HOOKS'];
formConfigs['tiktok_video_hooks'] = formConfigs['TIKTOK VIDEO HOOKS'];
formConfigs['TikTok Video Ideas'] = formConfigs['TIKTOK VIDEO IDEAS'];
formConfigs['tiktok_video_ideas'] = formConfigs['TIKTOK VIDEO IDEAS'];
formConfigs['Mini-VSL (Video Sales Letter)'] = formConfigs['MINI-VSL (VIDEO SALES LETTER)'];
formConfigs['mini_vsl'] = formConfigs['MINI-VSL (VIDEO SALES LETTER)'];
formConfigs['Digital Product Video'] = formConfigs['DIGITAL PRODUCT VIDEO'];
formConfigs['digital_product_video'] = formConfigs['DIGITAL PRODUCT VIDEO'];
formConfigs['Physical Product Video'] = formConfigs['PHYSICAL PRODUCT VIDEO'];
formConfigs['physical_product_video'] = formConfigs['PHYSICAL PRODUCT VIDEO'];
formConfigs['Physical Product Text to Video'] = formConfigs['PHYSICAL PRODUCT TEXT TO VIDEO'];
formConfigs['physical_product_text_to_video'] = formConfigs['PHYSICAL PRODUCT TEXT TO VIDEO'];
formConfigs['Physical Product Promotion Video with VEO 3'] = formConfigs['PHYSICAL PRODUCT PROMOTION VIDEO WITH VEO 3'];
formConfigs['physical_product_promotion_video_veo3'] = formConfigs['PHYSICAL PRODUCT PROMOTION VIDEO WITH VEO 3'];
formConfigs['Physical Product Scene-by-Scene Narrative with VEO 3'] = formConfigs['PHYSICAL PRODUCT SCENE-BY-SCENE NARRATIVE PROMOTION VIDEO WITH VEO 3'];
formConfigs['physical_product_scene_by_scene_veo3'] = formConfigs['PHYSICAL PRODUCT SCENE-BY-SCENE NARRATIVE PROMOTION VIDEO WITH VEO 3'];
formConfigs['Tutorial Video'] = formConfigs['TUTORIAL VIDEO'];
formConfigs['tutorial_video'] = formConfigs['TUTORIAL VIDEO'];
formConfigs['Informational Video'] = formConfigs['INFORMATIONAL VIDEO'];
formConfigs['informational_video'] = formConfigs['INFORMATIONAL VIDEO'];
formConfigs['Announcement Video'] = formConfigs['ANNOUNCEMENT VIDEO'];
formConfigs['announcement_video'] = formConfigs['ANNOUNCEMENT VIDEO'];
formConfigs['Amazon Video Script'] = formConfigs['AMAZON VIDEO SCRIPT'];
formConfigs['amazon_video_script'] = formConfigs['AMAZON VIDEO SCRIPT'];

// Ebook aliases (names and IDs used by ScriptsScreen)
formConfigs['Find a Niche'] = formConfigs['find_niche'];
formConfigs['Get an Ebook Idea'] = formConfigs['ebook_idea'];
formConfigs['Create Chapters and TOC'] = formConfigs['create_chapters_toc'];
formConfigs['Create Chapters'] = formConfigs['create_chapters'];
formConfigs['Ebook Conclusion'] = formConfigs['ebook_conclusion'];
formConfigs['Create a Disclaimer'] = formConfigs['create_disclaimer'];
formConfigs['Ebook Call to Action'] = formConfigs['ebook_cta'];
formConfigs['Ebook Author Bio'] = formConfigs['ebook_author_bio'];

// Default form config for unknown form types
export const getDefaultFormConfig = (formType: string) => {
  return {
    questions: [
      'What is the main topic or subject?',
      'Who is your target audience?',
      'What tone of voice do you want?',
      'What is the main purpose or goal?'
    ],
    examples: [
      'Example: digital marketing',
      'Example: small business owners',
      'Example: professional',
      'Example: educate and inform'
    ],
    template: 'Create content about {1} for the target audience of {2}. Use a {3} tone of voice and focus on the purpose of {4}.',
    tones: toneOptions,
    toneQuestionIndex: 2
  };
}; 
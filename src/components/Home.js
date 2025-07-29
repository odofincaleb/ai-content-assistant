import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

// Categories and their form types (all 132 forms with engaging descriptions)
const categories = {
  'All Scripts': [
    { type: 'Linkedin ads', description: 'Crush your B2B competition with laser-targeted professional ad copy that converts executives into customers' },
    { type: 'Blog/Article Titles', description: 'Generate viral headlines that skyrocket your click-through rates and dominate search rankings' },
    { type: 'Paragraph Script', description: 'Create compelling paragraphs that hook readers and boost your SEO rankings instantly' },
    { type: 'BLOG/ARTICLE IDEAS', description: 'Unlock endless content ideas that will keep your audience engaged and coming back for more' },
    { type: 'BLOG/ARTICLE INTRO', description: 'Write irresistible introductions that grab attention and force readers to continue reading' },
    { type: 'BLOG/ARTICLE OUTLINES', description: 'Structure your content like a pro with detailed outlines that flow perfectly' },
    { type: 'SHORT BLOG/ARTICLE', description: 'Create concise, powerful articles that deliver maximum impact in minimum words' },
    { type: 'GUARANTEES', description: 'Build unshakeable trust with compelling guarantee statements that eliminate customer hesitation' },
    { type: 'COMPANY BIO', description: 'Tell your brand story in a way that connects emotionally and drives customer loyalty' },
    { type: 'CONCLUSION SCRIPT', description: 'End your content with powerful conclusions that inspire action and leave lasting impressions' },
    { type: 'FACEBOOK ADS', description: 'Create Facebook ads that stop the scroll and convert browsers into buyers instantly' },
    { type: 'GOOGLE ADS', description: 'Write Google ads that dominate search results and drive qualified traffic to your offers' },
    { type: 'GENERAL ADVERTISEMENT', description: 'Craft versatile ad copy that works across all platforms and media channels' },
    { type: 'LinkedIn Post', description: 'Generate LinkedIn posts that establish thought leadership and grow your professional network' },
    { type: 'Apps and SMS Notification', description: 'Create notifications that users can\'t ignore and drive immediate engagement' },
    { type: 'Social Media Content Plan', description: 'Plan your entire social media strategy with content that builds your brand' },
    { type: 'INSTAGRAM CAPTION', description: 'Write Instagram captions that increase engagement and grow your following organically' },
    { type: 'INSTAGRAM REELS', description: 'Create Reels scripts that go viral and skyrocket your Instagram reach' },
    { type: 'TWITTER TWEET', description: 'Craft tweets that trend and amplify your message across the Twitterverse' },
    { type: 'TWITTER SERIES', description: 'Build Twitter threads that keep followers engaged and boost your authority' },
    { type: 'TRENDING INSTAGRAM HASHTAGS', description: 'Discover trending hashtags that put your content in front of millions' },
    { type: 'TRENDING TWITTER HASHTAGS', description: 'Find viral hashtags that make your tweets discoverable and shareable' },
    { type: 'PINTEREST PIN TITLE AND DESCRIPTION', description: 'Create Pinterest content that drives traffic and converts visitors into customers' },
    { type: 'QUORA ANSWERS', description: 'Write Quora answers that establish expertise and drive targeted traffic to your business' },
    { type: 'PERSONAL BIO', description: 'Craft personal bios that showcase your expertise and attract opportunities' },
    { type: 'LONG SALES COPY', description: 'Write long-form sales copy that converts prospects into paying customers' },
    { type: 'SHORT SALES COPY', description: 'Create concise sales copy that closes deals quickly and efficiently' },
    { type: 'OPTIN PAGES', description: 'Build opt-in pages that capture leads and grow your email list rapidly' },
    { type: 'CALL TO ACTIONS', description: 'Create CTAs that compel action and skyrocket your conversion rates' },
    { type: 'FEATURE/BENEFIT LIST', description: 'Transform features into irresistible benefits that sell your products' },
    { type: 'HEADLINES', description: 'Write headlines that grab attention and force people to read your content' },
    { type: 'SUBHEADLINES', description: 'Create subheadlines that guide readers through your content and boost engagement' },
    { type: 'UNIQUE VALUE PROPOSITION', description: 'Define your UVP in a way that makes competitors irrelevant' },
    { type: 'FAQ GENERATOR', description: 'Generate FAQs that address customer concerns and boost conversion rates' },
    { type: 'PRODUCT DESCRIPTION', description: 'Write product descriptions that sell features and benefits effectively' },
    { type: 'PRODUCT TITLES', description: 'Create product titles that grab attention and improve search rankings' },
    { type: 'PRODUCT FEATURES/ BULLETS', description: 'Transform product features into compelling bullet points that sell' },
    { type: 'AMAZON SPONSORED BRAND ADS HEADLINE', description: 'Write Amazon ad headlines that dominate search results and drive sales' },
    { type: 'AMAZON PRODUCT TITLES', description: 'Create Amazon product titles that rank higher and convert better' },
    { type: 'PERSONAL LETTER', description: 'Write personal letters that strengthen relationships and build connections' },
    { type: 'BUSINESS LETTER', description: 'Craft professional business letters that get results and maintain relationships' },
    { type: 'COVER LETTER', description: 'Write cover letters that land interviews and advance your career' },
    { type: 'REFERENCE/RECOMMENDATION LETTER', description: 'Create recommendation letters that open doors and create opportunities' },
    { type: 'RESIGNATION LETTER', description: 'Write resignation letters that maintain relationships and leave on good terms' },
    { type: 'THANK YOU LETTER', description: 'Express gratitude with letters that strengthen relationships and build loyalty' },
    { type: 'APOLOGY LETTER', description: 'Write apology letters that repair relationships and restore trust' },
    { type: 'COMPLAINT LETTER', description: 'Craft complaint letters that get results and resolve issues effectively' },
    { type: 'INVITATION LETTER', description: 'Create invitation letters that increase attendance and build excitement' },
    { type: 'CONTENT REWRITER', description: 'Rewrite content to create fresh, engaging pieces that rank better' },
    { type: 'REWRITE WITH KEYWORDS', description: 'Optimize content with keywords while maintaining readability and flow' },
    { type: 'NICHE IDEAS', description: 'Discover profitable niche ideas that align with your expertise and passion' },
    { type: 'ANALYZE GIVEN CONTENT', description: 'Analyze content to identify strengths, weaknesses, and improvement opportunities' },
    { type: 'INVESTIGATE A PARTICULAR NICHE', description: 'Research niches to understand market opportunities and competition' },
    { type: 'GENERATE BUSINESS IDEAS', description: 'Create innovative business ideas that solve real problems and generate revenue' },
    { type: 'GENERATE DIGITAL PRODUCT IDEAS', description: 'Develop digital product ideas that leverage technology and scale easily' },
    { type: 'GENERATE PHYSICAL PRODUCT IDEAS', description: 'Invent physical products that meet market needs and create value' },
    { type: 'GENERATE DOMAIN NAME IDEAS', description: 'Find domain names that are memorable, brandable, and available' },
    { type: 'KEYWORD RESEARCH', description: 'Conduct keyword research to optimize content and improve search rankings' },
    { type: 'GENERATE A BUSINESS PLAN', description: 'Create comprehensive business plans that attract investors and guide growth' },
    { type: 'CREATE CHAPTERS AND TOC', description: 'Structure books and ebooks with logical chapters and table of contents' },
    { type: 'CREATE CHAPTERS', description: 'Write detailed chapters that engage readers and deliver value' },
    { type: 'EBOOK CONCLUSION', description: 'End ebooks with powerful conclusions that inspire action and build authority' },
    { type: 'CREATE A DISCLAIMER', description: 'Write disclaimers that protect your business and build trust' },
    { type: 'EBOOK CALL TO ACTION', description: 'Create CTAs throughout ebooks that drive engagement and conversions' },
    { type: 'EBOOK AUTHOR BIO', description: 'Write author bios that establish credibility and connect with readers' },
    { type: 'SEO META TAGS', description: 'Optimize meta tags to improve search rankings and click-through rates' },
    { type: 'SEO META DESCRIPTIONS', description: 'Write meta descriptions that entice clicks and improve search visibility' },
    { type: 'PODCAST SCRIPT', description: 'Create podcast scripts that engage listeners and deliver valuable content' },
    { type: 'PODCAST INTERVIEW QUESTIONS', description: 'Develop interview questions that extract insights and entertain audiences' },
    { type: 'DIGITAL PRODUCT REVIEW', description: 'Write comprehensive reviews that help customers make informed decisions' },
    { type: 'PHYSICAL PRODUCT REVIEW', description: 'Create detailed product reviews that build trust and drive sales' },
    { type: 'MINI-VSL (VIDEO SALES LETTER)', description: 'Write video sales letters that convert viewers into customers' },
    { type: 'YOUTUBE SCRIPT', description: 'Create YouTube scripts that engage viewers and grow your channel' },
    { type: 'YOUTUBE TITLES', description: 'Generate YouTube titles that increase views and improve search rankings' },
    { type: 'YOUTUBE HOOKS', description: 'Create YouTube hooks that grab attention in the first 5 seconds' },
    { type: 'YOUTUBE OUTLINES', description: 'Structure YouTube videos with outlines that keep viewers engaged' },
    { type: 'YOUTUBE SHORTS', description: 'Write YouTube Shorts scripts that go viral and grow your audience' },
    { type: 'TIKTOK VIDEO SCRIPT', description: 'Create TikTok scripts that trend and build your following' },
    { type: 'TIKTOK VIDEO HOOKS', description: 'Write TikTok hooks that stop the scroll and increase watch time' },
    { type: 'TIKTOK VIDEO IDEAS', description: 'Generate TikTok video ideas that resonate with your target audience' },
    { type: 'DIGITAL PRODUCT VIDEO', description: 'Create video scripts that showcase digital products and drive sales' },
    { type: 'PHYSICAL PRODUCT VIDEO', description: 'Write video scripts that demonstrate physical products effectively' },
    { type: 'SHORT AD VIDEO', description: 'Create short ad videos that deliver your message quickly and effectively' },
    { type: 'TUTORIAL VIDEO', description: 'Write tutorial scripts that educate and engage your audience' },
    { type: 'INFORMATIONAL VIDEO', description: 'Create informational video scripts that build authority and trust' },
    { type: 'ANNOUNCEMENT VIDEO', description: 'Write announcement scripts that create excitement and drive engagement' },
    { type: 'FACEBOOK AD VIDEO', description: 'Create Facebook video ad scripts that convert and drive results' },
    { type: 'EMAIL SUBJECT LINES', description: 'Write email subject lines that increase open rates and drive engagement' },
    { type: 'PRODUCT OR SERVICE PROMOTION', description: 'Create promotional emails that convert subscribers into customers' },
    { type: 'NEWS ANNOUNCEMENT EMAIL', description: 'Write announcement emails that inform and engage your audience' },
    { type: 'PRODUCT UPDATES EMAIL', description: 'Create update emails that keep customers informed and engaged' },
    { type: 'INFORMATIONAL EMAIL', description: 'Write informational emails that educate and build relationships' },
    { type: 'COLD OUTREACH EMAILS', description: 'Create cold outreach emails that get responses and generate leads' },
    { type: 'AUTORESPONDER SERIES', description: 'Build email sequences that nurture leads and drive conversions' },
    { type: 'GENERAL SUPPORT SCRIPT', description: 'Create support scripts that provide excellent customer service' },
    { type: 'PRODUCT/SERVICE ACCESS', description: 'Write access scripts that help customers use your products effectively' },
    { type: 'SUPPORT SOLUTION FOR A PROBLEM', description: 'Create solution scripts that resolve customer issues quickly' },
    { type: 'SUPPORT AUTORESPONDER MESSAGE', description: 'Write autoresponder messages that reassure customers and set expectations' },
    { type: 'ENGAGING QUESTIONS', description: 'Generate questions that spark conversations and increase engagement' },
    { type: 'CREATIVE STORY', description: 'Write creative stories that entertain and connect with your audience' },
    { type: 'SUMMARIZE TEXT', description: 'Create concise summaries that capture key points and save time' },
    { type: 'CITATIONS GENERATOR', description: 'Generate citations in various formats for academic and professional use' },
    { type: 'QUOTES GENERATOR', description: 'Create inspiring quotes that motivate and engage your audience' },
    { type: 'TONE CHANGER', description: 'Transform text tone to match your audience and communication goals' },
    { type: 'SONG LYRICS', description: 'Write song lyrics that connect emotionally and create memorable content' },
    { type: 'REAL ESTATE LISTING DESCRIPTIONS', description: 'Create property descriptions that attract buyers and close deals' },
    { type: 'PAS FRAMEWORK', description: 'Use the Pain-Agitate-Solution framework to create compelling sales copy' },
    { type: 'REVIEW RESPONDER', description: 'Write review responses that build trust and improve your reputation' },
    { type: 'AIDA FRAMEWORK', description: 'Create AIDA copy that guides prospects through the sales funnel' },
    { type: 'PRODUCT NAMES', description: 'Generate product names that are memorable, brandable, and marketable' },
    { type: 'ANALOGY MAKER', description: 'Create analogies that simplify complex concepts and improve understanding' },
    { type: 'GROWTH IDEAS', description: 'Generate growth strategies that scale your business and increase revenue' },
    { type: 'KEYWORD EXTRACTOR', description: 'Extract keywords from content to improve SEO and content strategy' },
    { type: 'LISTICLE IDEAS', description: 'Create listicle ideas that attract readers and drive engagement' },
    { type: 'STARTUP IDEAS', description: 'Generate startup ideas that solve real problems and create value' },
    { type: 'TRANSLATE', description: 'Translate content to reach global audiences and expand your market' },
    { type: 'MAKE IT EASY-TO-READ', description: 'Simplify complex content to improve readability and accessibility' },
    { type: 'POEM GENERATOR', description: 'Create poems that inspire, entertain, and connect with your audience' },
    { type: 'GENERAL NEWS RELEASE', description: 'Write press releases that generate media coverage and build credibility' },
    { type: 'EVENT PRESS RELEASE', description: 'Create event press releases that attract attendees and media attention' },
    { type: 'PRODUCT LAUNCH PRESS RELEASE', description: 'Write launch press releases that create buzz and drive sales' },
    { type: 'PARTNERSHIP OR COLLABORATION PRESS RELEASE', description: 'Create partnership announcements that build credibility and expand reach' },
    { type: 'AWARD ANNOUNCEMENT PRESS RELEASE', description: 'Write award press releases that build reputation and attract opportunities' },
    { type: 'CRISIS OR ISSUE PRESS RELEASE', description: 'Create crisis communication that protects reputation and maintains trust' },
    { type: 'FINANCIAL OR EARNINGS PRESS RELEASE', description: 'Write financial press releases that inform stakeholders and build confidence' },
    { type: 'STAFF OR EXECUTIVE ANNOUNCEMENT PRESS RELEASE', description: 'Create staff announcement press releases that build team morale and attract talent' },
    { type: 'CHARITY OR COMMUNITY INVOLVEMENT PRESS RELEASE', description: 'Write community involvement press releases that build brand reputation and social impact' },
    { type: 'LEGAL OR REGULATORY PRESS RELEASE', description: 'Create legal press releases that maintain transparency and protect reputation' },
    { type: 'CONTENT WRITER', description: 'Rewrite content to create fresh, engaging pieces that rank better' },
    { type: 'EBOOK HEADLINES AND SUBHEADLINE', description: 'Create captivating ebook headlines that grab attention and drive sales' },
    { type: 'EBOOK INTRODUCTION', description: 'Write engaging introductions that hook readers and set expectations' },
    { type: 'FIND A NICHE', description: 'Discover profitable niche markets that align with your expertise and passion' },
    { type: 'GET AN EBOOK IDEA', description: 'Generate compelling ebook concepts that attract wide audiences and deliver value' },
    { type: 'PRODUCT FEATURES/BULLETS', description: 'Transform product features into compelling bullet points that sell' },
    { type: 'REFERENCE/ RECOMMENDATION LETTER', description: 'Create recommendation letters that open doors and create opportunities' },
    { type: 'YOUTUBE DESCRIPTIONS', description: 'Write search-optimized YouTube descriptions that increase views and engagement' },
    { type: 'YOUTUBE HASTAGS', description: 'Generate trending hashtags that boost YouTube video visibility and reach' },
    { type: 'YOUTUBE TAGS', description: 'Create effective tags that improve YouTube search rankings and discoverability' }
  ],
  'Advertisements': [
    { type: 'Linkedin ads', description: 'Crush your B2B competition with laser-targeted professional ad copy that converts executives into customers' },
    { type: 'FACEBOOK ADS', description: 'Create Facebook ads that stop the scroll and convert browsers into buyers instantly' },
    { type: 'GOOGLE ADS', description: 'Write Google ads that dominate search results and drive qualified traffic to your offers' },
    { type: 'GENERAL ADVERTISEMENT', description: 'Craft versatile ad copy that works across all platforms and media channels' },
    { type: 'Apps and SMS Notification', description: 'Create notifications that users can\'t ignore and drive immediate engagement' },
    { type: 'AMAZON SPONSORED BRAND ADS HEADLINE', description: 'Write Amazon ad headlines that dominate search results and drive sales' },
    { type: 'AMAZON PRODUCT TITLES', description: 'Create Amazon product titles that rank higher and convert better' },
    { type: 'SHORT AD VIDEO', description: 'Create short ad videos that deliver your message quickly and effectively' },
    { type: 'FACEBOOK AD VIDEO', description: 'Create Facebook video ad scripts that convert and drive results' }
  ],
  'Articles and Blogs': [
    { type: 'Blog/Article Titles', description: 'Generate viral headlines that skyrocket your click-through rates and dominate search rankings' },
    { type: 'Paragraph Script', description: 'Create compelling paragraphs that hook readers and boost your SEO rankings instantly' },
    { type: 'BLOG/ARTICLE IDEAS', description: 'Unlock endless content ideas that will keep your audience engaged and coming back for more' },
    { type: 'BLOG/ARTICLE INTRO', description: 'Write irresistible introductions that grab attention and force readers to continue reading' },
    { type: 'BLOG/ARTICLE OUTLINES', description: 'Structure your content like a pro with detailed outlines that flow perfectly' },
    { type: 'SHORT BLOG/ARTICLE', description: 'Create concise, powerful articles that deliver maximum impact in minimum words' },
    { type: 'CONCLUSION SCRIPT', description: 'End your content with powerful conclusions that inspire action and leave lasting impressions' },
    { type: 'CONTENT REWRITER', description: 'Rewrite content to create fresh, engaging pieces that rank better' },
    { type: 'REWRITE WITH KEYWORDS', description: 'Optimize content with keywords while maintaining readability and flow' },
    { type: 'ANALYZE GIVEN CONTENT', description: 'Analyze content to identify strengths, weaknesses, and improvement opportunities' },
    { type: 'KEYWORD RESEARCH', description: 'Conduct keyword research to optimize content and improve search rankings' },
    { type: 'KEYWORD EXTRACTOR', description: 'Extract keywords from content to improve SEO and content strategy' },
    { type: 'LISTICLE IDEAS', description: 'Create listicle ideas that attract readers and drive engagement' },
    { type: 'MAKE IT EASY-TO-READ', description: 'Simplify complex content to improve readability and accessibility' }
  ],
  'Social Media': [
    { type: 'LinkedIn Post', description: 'Generate LinkedIn posts that establish thought leadership and grow your professional network' },
    { type: 'Social Media Content Plan', description: 'Plan your entire social media strategy with content that builds your brand' },
    { type: 'INSTAGRAM CAPTION', description: 'Write Instagram captions that increase engagement and grow your following organically' },
    { type: 'INSTAGRAM REELS', description: 'Create Reels scripts that go viral and skyrocket your Instagram reach' },
    { type: 'TWITTER TWEET', description: 'Craft tweets that trend and amplify your message across the Twitterverse' },
    { type: 'TWITTER SERIES', description: 'Build Twitter threads that keep followers engaged and boost your authority' },
    { type: 'TRENDING INSTAGRAM HASHTAGS', description: 'Discover trending hashtags that put your content in front of millions' },
    { type: 'TRENDING TWITTER HASHTAGS', description: 'Find viral hashtags that make your tweets discoverable and shareable' },
    { type: 'PINTEREST PIN TITLE AND DESCRIPTION', description: 'Create Pinterest content that drives traffic and converts visitors into customers' },
    { type: 'QUORA ANSWERS', description: 'Write Quora answers that establish expertise and drive targeted traffic to your business' },
    { type: 'ENGAGING QUESTIONS', description: 'Generate questions that spark conversations and increase engagement' }
  ],
  'Video Content': [
    { type: 'MINI-VSL (VIDEO SALES LETTER)', description: 'Write video sales letters that convert viewers into customers' },
    { type: 'YOUTUBE SCRIPT', description: 'Create YouTube scripts that engage viewers and grow your channel' },
    { type: 'YOUTUBE TITLES', description: 'Generate YouTube titles that increase views and improve search rankings' },
    { type: 'YOUTUBE HOOKS', description: 'Create YouTube hooks that grab attention in the first 5 seconds' },
    { type: 'YOUTUBE OUTLINES', description: 'Structure YouTube videos with outlines that keep viewers engaged' },
    { type: 'YOUTUBE SHORTS', description: 'Write YouTube Shorts scripts that go viral and grow your audience' },
    { type: 'YOUTUBE DESCRIPTIONS', description: 'Write search-optimized YouTube descriptions that increase views and engagement' },
    { type: 'YOUTUBE HASTAGS', description: 'Generate trending hashtags that boost YouTube video visibility and reach' },
    { type: 'YOUTUBE TAGS', description: 'Create effective tags that improve YouTube search rankings and discoverability' },
    { type: 'TIKTOK VIDEO SCRIPT', description: 'Create TikTok scripts that trend and build your following' },
    { type: 'TIKTOK VIDEO HOOKS', description: 'Write TikTok hooks that stop the scroll and increase watch time' },
    { type: 'TIKTOK VIDEO IDEAS', description: 'Generate TikTok video ideas that resonate with your target audience' },
    { type: 'DIGITAL PRODUCT VIDEO', description: 'Create video scripts that showcase digital products and drive sales' },
    { type: 'PHYSICAL PRODUCT VIDEO', description: 'Write video scripts that demonstrate physical products effectively' },
    { type: 'SHORT AD VIDEO', description: 'Create short ad videos that deliver your message quickly and effectively' },
    { type: 'TUTORIAL VIDEO', description: 'Write tutorial scripts that educate and engage your audience' },
    { type: 'INFORMATIONAL VIDEO', description: 'Create informational video scripts that build authority and trust' },
    { type: 'ANNOUNCEMENT VIDEO', description: 'Write announcement scripts that create excitement and drive engagement' },
    { type: 'FACEBOOK AD VIDEO', description: 'Create Facebook video ad scripts that convert and drive results' },
    { type: 'PODCAST SCRIPT', description: 'Create podcast scripts that engage listeners and deliver valuable content' },
    { type: 'PODCAST INTERVIEW QUESTIONS', description: 'Develop interview questions that extract insights and entertain audiences' }
  ],
  'Email Marketing': [
    { type: 'EMAIL SUBJECT LINES', description: 'Write email subject lines that increase open rates and drive engagement' },
    { type: 'PRODUCT OR SERVICE PROMOTION', description: 'Create promotional emails that convert subscribers into customers' },
    { type: 'NEWS ANNOUNCEMENT EMAIL', description: 'Write announcement emails that inform and engage your audience' },
    { type: 'PRODUCT UPDATES EMAIL', description: 'Create update emails that keep customers informed and engaged' },
    { type: 'INFORMATIONAL EMAIL', description: 'Write informational emails that educate and build relationships' },
    { type: 'COLD OUTREACH EMAILS', description: 'Create cold outreach emails that get responses and generate leads' },
    { type: 'AUTORESPONDER SERIES', description: 'Build email sequences that nurture leads and drive conversions' }
  ],
  'Sales and Marketing': [
    { type: 'LONG SALES COPY', description: 'Write long-form sales copy that converts prospects into paying customers' },
    { type: 'SHORT SALES COPY', description: 'Create concise sales copy that closes deals quickly and efficiently' },
    { type: 'OPTIN PAGES', description: 'Build opt-in pages that capture leads and grow your email list rapidly' },
    { type: 'CALL TO ACTIONS', description: 'Create CTAs that compel action and skyrocket your conversion rates' },
    { type: 'FEATURE/BENEFIT LIST', description: 'Transform features into irresistible benefits that sell your products' },
    { type: 'HEADLINES', description: 'Write headlines that grab attention and force people to read your content' },
    { type: 'SUBHEADLINES', description: 'Create subheadlines that guide readers through your content and boost engagement' },
    { type: 'UNIQUE VALUE PROPOSITION', description: 'Define your UVP in a way that makes competitors irrelevant' },
    { type: 'PRODUCT DESCRIPTION', description: 'Write product descriptions that sell features and benefits effectively' },
    { type: 'PRODUCT TITLES', description: 'Create product titles that grab attention and improve search rankings' },
    { type: 'PRODUCT FEATURES/ BULLETS', description: 'Transform product features into compelling bullet points that sell' },
    { type: 'PAS FRAMEWORK', description: 'Use the Pain-Agitate-Solution framework to create compelling sales copy' },
    { type: 'AIDA FRAMEWORK', description: 'Create AIDA copy that guides prospects through the sales funnel' },
    { type: 'REVIEW RESPONDER', description: 'Write review responses that build trust and improve your reputation' }
  ],
  'Business and Professional': [
    { type: 'COMPANY BIO', description: 'Tell your brand story in a way that connects emotionally and drives customer loyalty' },
    { type: 'PERSONAL BIO', description: 'Craft personal bios that showcase your expertise and attract opportunities' },
    { type: 'PERSONAL LETTER', description: 'Write personal letters that strengthen relationships and build connections' },
    { type: 'BUSINESS LETTER', description: 'Craft professional business letters that get results and maintain relationships' },
    { type: 'COVER LETTER', description: 'Write cover letters that land interviews and advance your career' },
    { type: 'REFERENCE/RECOMMENDATION LETTER', description: 'Create recommendation letters that open doors and create opportunities' },
    { type: 'REFERENCE/ RECOMMENDATION LETTER', description: 'Create recommendation letters that open doors and create opportunities' },
    { type: 'RESIGNATION LETTER', description: 'Write resignation letters that maintain relationships and leave on good terms' },
    { type: 'THANK YOU LETTER', description: 'Express gratitude with letters that strengthen relationships and build loyalty' },
    { type: 'APOLOGY LETTER', description: 'Write apology letters that repair relationships and restore trust' },
    { type: 'COMPLAINT LETTER', description: 'Craft complaint letters that get results and resolve issues effectively' },
    { type: 'INVITATION LETTER', description: 'Create invitation letters that increase attendance and build excitement' },
    { type: 'GENERATE A BUSINESS PLAN', description: 'Create comprehensive business plans that attract investors and guide growth' },
    { type: 'GENERATE BUSINESS IDEAS', description: 'Create innovative business ideas that solve real problems and generate revenue' },
    { type: 'STARTUP IDEAS', description: 'Generate startup ideas that solve real problems and create value' },
    { type: 'GROWTH IDEAS', description: 'Generate growth strategies that scale your business and increase revenue' }
  ],
  'Content Creation': [
    { type: 'GUARANTEES', description: 'Build unshakeable trust with compelling guarantee statements that eliminate customer hesitation' },
    { type: 'FAQ GENERATOR', description: 'Generate FAQs that address customer concerns and boost conversion rates' },
    { type: 'DIGITAL PRODUCT REVIEW', description: 'Write comprehensive reviews that help customers make informed decisions' },
    { type: 'PHYSICAL PRODUCT REVIEW', description: 'Create detailed product reviews that build trust and drive sales' },
    { type: 'CREATIVE STORY', description: 'Write creative stories that entertain and connect with your audience' },
    { type: 'SONG LYRICS', description: 'Write song lyrics that connect emotionally and create memorable content' },
    { type: 'POEM GENERATOR', description: 'Create poems that inspire, entertain, and connect with your audience' },
    { type: 'QUOTES GENERATOR', description: 'Create inspiring quotes that motivate and engage your audience' },
    { type: 'TONE CHANGER', description: 'Transform text tone to match your audience and communication goals' },
    { type: 'SUMMARIZE TEXT', description: 'Create concise summaries that capture key points and save time' },
    { type: 'TRANSLATE', description: 'Translate content to reach global audiences and expand your market' },
    { type: 'CITATIONS GENERATOR', description: 'Generate citations in various formats for academic and professional use' }
  ],
  'Customer Service': [
    { type: 'GENERAL SUPPORT SCRIPT', description: 'Create support scripts that provide excellent customer service' },
    { type: 'PRODUCT/SERVICE ACCESS', description: 'Write access scripts that help customers use your products effectively' },
    { type: 'SUPPORT SOLUTION FOR A PROBLEM', description: 'Create solution scripts that resolve customer issues quickly' },
    { type: 'SUPPORT AUTORESPONDER MESSAGE', description: 'Write autoresponder messages that reassure customers and set expectations' }
  ],
  'Ecommerce': [
    { type: 'AMAZON SPONSORED BRAND ADS HEADLINE', description: 'Write Amazon ad headlines that dominate search results and drive sales' },
    { type: 'AMAZON PRODUCT TITLES', description: 'Create Amazon product titles that rank higher and convert better' },
    { type: 'PRODUCT NAMES', description: 'Generate product names that are memorable, brandable, and marketable' },
    { type: 'REAL ESTATE LISTING DESCRIPTIONS', description: 'Create property descriptions that attract buyers and close deals' }
  ],
  'Research and Analysis': [
    { type: 'NICHE IDEAS', description: 'Discover profitable niche ideas that align with your expertise and passion' },
    { type: 'INVESTIGATE A PARTICULAR NICHE', description: 'Research niches to understand market opportunities and competition' },
    { type: 'GENERATE DIGITAL PRODUCT IDEAS', description: 'Develop digital product ideas that leverage technology and scale easily' },
    { type: 'GENERATE PHYSICAL PRODUCT IDEAS', description: 'Invent physical products that meet market needs and create value' },
    { type: 'GENERATE DOMAIN NAME IDEAS', description: 'Find domain names that are memorable, brandable, and available' },
    { type: 'ANALOGY MAKER', description: 'Create analogies that simplify complex concepts and improve understanding' },
    { type: 'FIND A NICHE', description: 'Discover profitable niche markets that align with your expertise and passion' },
    { type: 'GET AN EBOOK IDEA', description: 'Generate compelling ebook concepts that attract wide audiences and deliver value' }
  ],
  'Publishing': [
    { type: 'CREATE CHAPTERS AND TOC', description: 'Structure books and ebooks with logical chapters and table of contents' },
    { type: 'CREATE CHAPTERS', description: 'Write detailed chapters that engage readers and deliver value' },
    { type: 'EBOOK CONCLUSION', description: 'End ebooks with powerful conclusions that inspire action and build authority' },
    { type: 'CREATE A DISCLAIMER', description: 'Write disclaimers that protect your business and build trust' },
    { type: 'EBOOK CALL TO ACTION', description: 'Create CTAs throughout ebooks that drive engagement and conversions' },
    { type: 'EBOOK AUTHOR BIO', description: 'Write author bios that establish credibility and connect with readers' },
    { type: 'EBOOK HEADLINES AND SUBHEADLINE', description: 'Create captivating ebook headlines that grab attention and drive sales' },
    { type: 'EBOOK INTRODUCTION', description: 'Write engaging introductions that hook readers and set expectations' }
  ],
  'SEO and Analytics': [
    { type: 'SEO META TAGS', description: 'Optimize meta tags to improve search rankings and click-through rates' },
    { type: 'SEO META DESCRIPTIONS', description: 'Write meta descriptions that entice clicks and improve search visibility' }
  ],
  'Press Releases': [
    { type: 'GENERAL NEWS RELEASE', description: 'Write press releases that generate media coverage and build credibility' },
    { type: 'EVENT PRESS RELEASE', description: 'Create event press releases that attract attendees and media attention' },
    { type: 'PRODUCT LAUNCH PRESS RELEASE', description: 'Write launch press releases that create buzz and drive sales' },
    { type: 'PARTNERSHIP OR COLLABORATION PRESS RELEASE', description: 'Create partnership announcements that build credibility and expand reach' },
    { type: 'AWARD ANNOUNCEMENT PRESS RELEASE', description: 'Write award press releases that build reputation and attract opportunities' },
    { type: 'CRISIS OR ISSUE PRESS RELEASE', description: 'Create crisis communication that protects reputation and maintains trust' },
    { type: 'FINANCIAL OR EARNINGS PRESS RELEASE', description: 'Write financial press releases that inform stakeholders and build confidence' },
    { type: 'STAFF OR EXECUTIVE ANNOUNCEMENT PRESS RELEASE', description: 'Create staff announcement press releases that build team morale and attract talent' },
    { type: 'CHARITY OR COMMUNITY INVOLVEMENT PRESS RELEASE', description: 'Write community involvement press releases that build brand reputation and social impact' },
    { type: 'LEGAL OR REGULATORY PRESS RELEASE', description: 'Create legal press releases that maintain transparency and protect reputation' }
  ]
};

const categoryNames = Object.keys(categories);

function Home({ onFormTypeSelect }) {
  const [activeCategory, setActiveCategory] = useState('All Scripts');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Show 12 items per page
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearchingAllCategories, setIsSearchingAllCategories] = useState(false);
  const [recentForms, setRecentForms] = useState([]);
  const [showRecentForms, setShowRecentForms] = useState(false);
  const searchInputRef = useRef(null);

  const handleFormTypeClick = (formType) => {
    console.log('=== FORM CLICK START ===');
    console.log('Form type clicked:', formType);
    console.log('Current recentForms before:', recentForms);
    
    // Add to recent forms
    addToRecentForms(formType);
    
    console.log('After addToRecentForms call');
    
    // Small delay to ensure state update completes
    setTimeout(() => {
      if (onFormTypeSelect) {
        console.log('Calling onFormTypeSelect with:', formType);
        onFormTypeSelect(formType);
      } else {
        console.log('onFormTypeSelect is not provided');
      }
    }, 100);
    
    console.log('=== FORM CLICK END ===');
  };

  // Add form type to recent forms
  const addToRecentForms = (formType) => {
    console.log('Adding to recent forms:', formType);
    console.log('Available categories:', Object.keys(categories));
    
    setRecentForms(prev => {
      // Remove if already exists
      const filtered = prev.filter(form => form.type !== formType);
      
      // Find the form details
      let formDetails = null;
      for (const category of Object.keys(categories)) {
        const found = categories[category].find(form => form.type === formType);
        if (found) {
          formDetails = { ...found, category };
          console.log('Found in category:', category);
          break;
        }
      }
      
      if (formDetails) {
        // Add timestamp
        formDetails.lastUsed = new Date().toISOString();
        console.log('Form details found:', formDetails);
        // Add to beginning and limit to 8 items
        const newRecentForms = [formDetails, ...filtered].slice(0, 8);
        console.log('Updated recent forms:', newRecentForms);
        return newRecentForms;
      } else {
        console.log('Form details not found for:', formType);
        console.log('Available form types in categories:');
        Object.keys(categories).forEach(cat => {
          console.log(`${cat}:`, categories[cat].map(f => f.type));
        });
      }
      
      return prev;
    });
  };

  // Remove form from recent forms
  const removeFromRecentForms = (formType) => {
    setRecentForms(prev => prev.filter(form => form.type !== formType));
  };

  // Clear all recent forms
  const clearRecentForms = () => {
    if (window.confirm('Are you sure you want to clear all recent forms? This action cannot be undone.')) {
      setRecentForms([]);
      localStorage.removeItem('recentForms');
      console.log('Recent forms cleared by user');
    }
  };

  // Clear corrupted data and refresh
  const clearCorruptedData = () => {
    localStorage.removeItem('recentForms');
    setRecentForms([]);
    window.location.reload(); // Refresh to ensure clean state
  };

  // Get all form types across all categories for global search
  const getAllFormTypes = () => {
    const allForms = [];
    Object.keys(categories).forEach(category => {
      categories[category].forEach(form => {
        allForms.push({
          ...form,
          category: category
        });
      });
    });
    return allForms;
  };

  // Generate search suggestions
  const getSearchSuggestions = (query) => {
    if (!query.trim()) return [];
    
    const allForms = getAllFormTypes();
    const suggestions = allForms
      .filter(form => 
        form.type.toLowerCase().includes(query.toLowerCase()) ||
        form.description.toLowerCase().includes(query.toLowerCase()) ||
        form.category.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 8); // Limit to 8 suggestions
    
    return suggestions;
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
    setIsSearchingAllCategories(value.length > 0);
    
    // Reset to first page when search changes
    setCurrentPage(1);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.type);
    setShowSuggestions(false);
    setActiveCategory(suggestion.category);
    setIsSearchingAllCategories(false);
    setCurrentPage(1);
    
    // Add to search history
    if (!searchHistory.includes(suggestion.type)) {
      setSearchHistory(prev => [suggestion.type, ...prev.slice(0, 4)]);
    }
  };

  // Handle search history click
  const handleHistoryClick = (historyItem) => {
    setSearchTerm(historyItem);
    setShowSuggestions(false);
    setIsSearchingAllCategories(false);
    setCurrentPage(1);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    setIsSearchingAllCategories(false);
    setCurrentPage(1);
  };

  // Filter form types based on search
  const getFilteredFormTypes = () => {
    if (isSearchingAllCategories) {
      // Search across all categories
      return getAllFormTypes().filter(form =>
        form.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // Search within active category only
      return categories[activeCategory].filter(form =>
        form.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  const filteredFormTypes = getFilteredFormTypes();
  const suggestions = getSearchSuggestions(searchTerm);

  // Calculate pagination
  const totalPages = Math.ceil(filteredFormTypes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFormTypes = filteredFormTypes.slice(startIndex, endIndex);

  // Reset to first page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load recent forms from localStorage on component mount
  useEffect(() => {
    const savedRecentForms = localStorage.getItem('recentForms');
    if (savedRecentForms) {
      try {
        const parsed = JSON.parse(savedRecentForms);
        
        // Validate that it's an array and has the correct structure
        if (Array.isArray(parsed)) {
          const validForms = parsed.filter(form => 
            form && 
            typeof form === 'object' && 
            form.type && 
            form.description && 
            form.category && 
            form.lastUsed
          );
          
          if (validForms.length > 0) {
            setRecentForms(validForms);
          } else {
            // Clear corrupted data
            localStorage.removeItem('recentForms');
            setRecentForms([]);
          }
        } else {
          // Clear invalid data
          localStorage.removeItem('recentForms');
          setRecentForms([]);
        }
      } catch (error) {
        console.error('Error loading recent forms:', error);
        // Clear corrupted data
        localStorage.removeItem('recentForms');
        setRecentForms([]);
      }
    }
  }, []);

  // Save recent forms to localStorage whenever it changes
  useEffect(() => {
    console.log('recentForms changed:', recentForms);
    if (recentForms.length > 0) {
      localStorage.setItem('recentForms', JSON.stringify(recentForms));
      console.log('Saved to localStorage:', recentForms);
    }
  }, [recentForms]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Highlight search terms in text
  const highlightText = (text, searchTerm) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="search-highlight">{part}</span>
      ) : part
    );
  };

  // Format relative time
  const formatRelativeTime = (timestamp) => {
    if (!timestamp) return 'Unknown time';
    
    try {
      const now = new Date();
      const time = new Date(timestamp);
      
      // Check if the date is valid
      if (isNaN(time.getTime())) {
        return 'Unknown time';
      }
      
      const diffInMinutes = Math.floor((now - time) / (1000 * 60));
      
      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
      
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours} hours ago`;
      
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return `${diffInDays} days ago`;
      
      const diffInWeeks = Math.floor(diffInDays / 7);
      if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
      
      const diffInMonths = Math.floor(diffInDays / 30);
      return `${diffInMonths} months ago`;
    } catch (error) {
      return 'Unknown time';
    }
  };

  // Debug: Log current state
  console.log('Current recentForms state:', recentForms);
  console.log('recentForms.length:', recentForms.length);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    // Always show first page
    buttons.push(
      <button
        key={1}
        className={`pagination-button ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
    );

    // Calculate start and end of visible buttons
    let startPage = Math.max(2, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisibleButtons - 3);
    
    if (endPage - startPage < maxVisibleButtons - 3) {
      startPage = Math.max(2, endPage - maxVisibleButtons + 3);
    }

    // Add ellipsis if needed
    if (startPage > 2) {
      buttons.push(
        <span key="ellipsis1" className="pagination-ellipsis">...</span>
      );
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      buttons.push(
        <span key="ellipsis2" className="pagination-ellipsis">...</span>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          className={`pagination-button ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="home-container">
      {/* Enhanced Search Bar */}
      <div className="search-container">
        <div className="search-bar" ref={searchInputRef}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search all scripts, categories, or descriptions..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            onFocus={() => setShowSuggestions(searchTerm.length > 0)}
          />
          {searchTerm && (
            <button 
              className="clear-search-btn"
              onClick={clearSearch}
              title="Clear search"
            >
              ✕
            </button>
          )}
          
          {/* Search Suggestions Dropdown */}
          {showSuggestions && (
            <div className="search-suggestions">
              {/* Search History */}
              {searchHistory.length > 0 && (
                <div className="suggestion-section">
                  <div className="suggestion-title">Recent Searches</div>
                  {searchHistory.map((item, index) => (
                    <div 
                      key={`history-${index}`}
                      className="suggestion-item history-item"
                      onClick={() => handleHistoryClick(item)}
                    >
                      <span className="suggestion-icon">🕒</span>
                      {item}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Search Suggestions */}
              {suggestions.length > 0 && (
                <div className="suggestion-section">
                  <div className="suggestion-title">Suggestions</div>
                  {suggestions.map((suggestion, index) => (
                    <div 
                      key={`suggestion-${index}`}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="suggestion-content">
                        <div className="suggestion-title-text">
                          {highlightText(suggestion.type, searchTerm)}
                        </div>
                        <div className="suggestion-category">
                          {suggestion.category}
                        </div>
                        <div className="suggestion-description">
                          {suggestion.description ? suggestion.description.substring(0, 80) + '...' : 'No description available'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* No Results */}
              {suggestions.length === 0 && searchHistory.length === 0 && (
                <div className="suggestion-section">
                  <div className="no-suggestions">
                    No results found for "{searchTerm}"
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Search Mode Indicator */}
        {isSearchingAllCategories && (
          <div className="search-mode-indicator">
            🔍 Searching across all categories
          </div>
        )}
      </div>

      {/* Recent Forms Section */}
      {showRecentForms && !searchTerm && (
        <div className="recent-forms-section" key={`recent-forms-${recentForms.length}`}>
          <div className="recent-forms-header">
            <h2 className="recent-forms-title">
              <span className="recent-icon">🕒</span>
              Recently Used
            </h2>
            <div className="recent-forms-actions">
              <button 
                className="toggle-recent-btn"
                onClick={() => setShowRecentForms(false)}
                title="Hide recent forms"
              >
                ✕
              </button>
              {recentForms.length > 0 && (
                <button 
                  className="clear-recent-btn"
                  onClick={clearRecentForms}
                  title="Clear all recent forms"
                >
                  Clear All
                </button>
              )}
              <button 
                className="clear-recent-btn"
                onClick={clearCorruptedData}
                title="Clear corrupted data and refresh app"
                style={{ backgroundColor: '#dc3545', color: 'white' }}
              >
                Fix Corrupted Data
              </button>
            </div>
          </div>
          
          {recentForms.length > 0 ? (
            <div className="recent-forms-grid">
              {recentForms.map((form, index) => (
                <div key={`recent-form-${form.type}-${index}`} className="recent-form-card">
                  <div className="recent-form-header">
                    <div className="recent-form-category">
                      📁 {form.category}
                    </div>
                    <button 
                      className="remove-recent-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromRecentForms(form.type);
                      }}
                      title="Remove from recent"
                    >
                      ×
                    </button>
                  </div>
                  
                  <h3 className="recent-form-type">
                    {form.type}
                  </h3>
                  <p className="recent-form-description">
                    {form.description ? form.description.substring(0, 60) + '...' : 'No description available'}
                  </p>
                  
                  <div className="recent-form-footer">
                    <span className="recent-form-time">
                      {formatRelativeTime(form.lastUsed)}
                    </span>
                    <button
                      className="recent-continue-btn"
                      onClick={() => handleFormTypeClick(form.type)}
                    >
                      Use Again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="recent-forms-empty">
              <div className="empty-message">
                <span className="empty-icon">📝</span>
                <h3>No Recent Forms</h3>
                <p>Start using forms to see them appear here for quick access!</p>
                <div className="empty-suggestions">
                  <p>Try clicking on any form type below to add it to your recent list.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Show Recent Forms Toggle */}
      {!showRecentForms && !searchTerm && (
        <div className="show-recent-toggle">
          <button 
            className="show-recent-btn"
            onClick={() => setShowRecentForms(true)}
          >
            <span className="recent-icon">🕒</span>
            Show Recent Forms {recentForms.length > 0 && `(${recentForms.length})`}
          </button>
        </div>
      )}

      {/* Category Tabs */}
      <div className="category-tabs">
        {categoryNames.map(category => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(category);
              setIsSearchingAllCategories(false);
              setCurrentPage(1);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Category Title */}
      <div className="category-title">
        <h1>
          {isSearchingAllCategories ? 'Search Results' : activeCategory}
          {searchTerm && (
            <span className="search-term-display">
              for "{searchTerm}"
            </span>
          )}
        </h1>
        <p className="results-count">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredFormTypes.length)} of {filteredFormTypes.length} results
        </p>
      </div>

      {/* Form Type Grid */}
      <div className="form-grid">
        {currentFormTypes.map((form, index) => (
          <div key={index} className="form-card">
            <h3 className="form-type">
              {highlightText(form.type, searchTerm)}
            </h3>
            <p className="form-description">
              {highlightText(form.description, searchTerm)}
            </p>
            {isSearchingAllCategories && (
              <div className="form-category">
                📁 {form.category}
              </div>
            )}
            <button
              className="continue-button"
              onClick={() => handleFormTypeClick(form.type)}
            >
              Continue
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination-controls">
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            
            <div className="pagination-numbers">
              {renderPaginationButtons()}
            </div>
            
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
          
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
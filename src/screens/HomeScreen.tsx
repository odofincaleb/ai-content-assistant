import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLicense } from '../contexts/LicenseContext';
import { useScript } from '../contexts/ScriptContext';
import BrowserSection from '../components/BrowserSection';

// Categories and their form types (exact match from main app Home.js)
const categories = {
  'All Scripts': [
    { type: 'Linkedin ads', description: 'Crush your B2B competition with laser-targeted professional ad copy' },
    { type: 'Blog/Article Titles', description: 'Generate viral headlines that skyrocket your click-through rates' },
    { type: 'FACEBOOK ADS', description: 'Create Facebook ads that stop the scroll and convert browsers into buyers' },
    { type: 'GOOGLE ADS', description: 'Write Google ads that dominate search results and drive qualified traffic' },
    { type: 'LinkedIn Post', description: 'Generate LinkedIn posts that establish thought leadership' },
    { type: 'INSTAGRAM CAPTION', description: 'Write Instagram captions that increase engagement' },
    { type: 'TWITTER TWEET', description: 'Craft tweets that trend and amplify your message' },
    { type: 'LONG SALES COPY', description: 'Write long-form sales copy that converts prospects into customers' },
    { type: 'SHORT SALES COPY', description: 'Create concise sales copy that closes deals quickly' },
    { type: 'EMAIL SUBJECT LINES', description: 'Write email subject lines that increase open rates' },
    { type: 'YOUTUBE SCRIPT', description: 'Create YouTube scripts that engage viewers and grow your channel' },
    { type: 'TIKTOK VIDEO SCRIPT', description: 'Create TikTok scripts that trend and build your following' },
    { type: 'GENERAL ADVERTISEMENT', description: 'Craft versatile ad copy that works across all platforms' },
    { type: 'AMAZON SPONSORED BRAND ADS HEADLINE', description: 'Write Amazon ad headlines that dominate search results' },
    { type: 'AMAZON PRODUCT TITLES', description: 'Create Amazon product titles that rank higher and convert better' },
    { type: 'INSTAGRAM REELS', description: 'Create Reels scripts that go viral and skyrocket your reach' },
    { type: 'TWITTER SERIES', description: 'Build Twitter threads that keep followers engaged' },
    { type: 'PINTEREST PIN TITLE AND DESCRIPTION', description: 'Create Pinterest content that drives traffic' },
    { type: 'CALL TO ACTIONS', description: 'Create CTAs that compel action and skyrocket conversion rates' },
    { type: 'HEADLINES', description: 'Write headlines that grab attention and force people to read' },
    { type: 'PRODUCT DESCRIPTION', description: 'Write product descriptions that sell features and benefits' },
    { type: 'PAS FRAMEWORK', description: 'Use the Pain-Agitate-Solution framework to create compelling copy' },
    { type: 'AIDA FRAMEWORK', description: 'Create AIDA copy that guides prospects through the sales funnel' },
    { type: 'YOUTUBE TITLES', description: 'Generate YouTube titles that increase views and improve rankings' },
    { type: 'YOUTUBE HOOKS', description: 'Create YouTube hooks that grab attention in the first 5 seconds' },
    { type: 'TIKTOK VIDEO HOOKS', description: 'Write TikTok hooks that stop the scroll and increase watch time' },
    { type: 'PODCAST SCRIPT', description: 'Create podcast scripts that engage listeners and deliver value' },
    { type: 'PRODUCT OR SERVICE PROMOTION', description: 'Create promotional emails that convert subscribers' },
    { type: 'COLD OUTREACH EMAILS', description: 'Create cold outreach emails that get responses' },
    { type: 'AUTORESPONDER SERIES', description: 'Build email sequences that nurture leads and drive conversions' },
    { type: 'BLOG/ARTICLE IDEAS', description: 'Unlock endless content ideas that keep your audience engaged' },
    { type: 'BLOG/ARTICLE INTRO', description: 'Write irresistible introductions that grab attention' },
    { type: 'BLOG/ARTICLE OUTLINES', description: 'Structure your content like a pro with detailed outlines' },
    { type: 'SHORT BLOG/ARTICLE', description: 'Create concise, powerful articles that deliver maximum impact' },
    { type: 'Paragraph Script', description: 'Write SEO-optimized paragraphs with targeted keywords' },
    { type: 'GUARANTEES', description: 'Write compelling guarantee statements that build customer confidence' },
    { type: 'COMPANY BIO', description: 'Create engaging company bios that showcase your brand story' },
    { type: 'CONCLUSION SCRIPT', description: 'Write powerful conclusions that leave lasting impressions' },
    { type: 'Apps and SMS Notification', description: 'Create concise notification messages that drive engagement' },
    { type: 'Social Media Content Plan', description: 'Build comprehensive social media content strategies' },
    { type: 'TRENDING INSTAGRAM HASHTAGS', description: 'Generate trending hashtags to boost Instagram reach' },
    { type: 'TRENDING TWITTER HASHTAGS', description: 'Find trending hashtags to amplify Twitter engagement' },
    { type: 'QUORA ANSWERS', description: 'Write thoughtful Quora answers that establish expertise' },
    { type: 'PERSONAL BIO', description: 'Create captivating personal bios that stand out' },
    { type: 'OPTIN PAGES', description: 'Write persuasive opt-in page copy that converts visitors' },
    { type: 'FEATURE/BENEFIT LIST', description: 'Create compelling feature-benefit lists that sell' },
    { type: 'SUBHEADLINES', description: 'Write engaging subheadlines that guide readers through content' },
    { type: 'UNIQUE VALUE PROPOSITION', description: 'Craft clear UVPs that differentiate your offering' },
    { type: 'FAQ GENERATOR', description: 'Generate comprehensive FAQs that address customer concerns' },
    { type: 'PRODUCT TITLES', description: 'Create eye-catching product titles that drive clicks' },
    { type: 'PRODUCT FEATURES/ BULLETS', description: 'Write compelling product bullet points that convert' },
    { type: 'PERSONAL LETTER', description: 'Write warm personal letters that connect with recipients' },
    { type: 'BUSINESS LETTER', description: 'Create professional business letters for formal communication' },
    { type: 'COVER LETTER', description: 'Write compelling cover letters that land interviews' },
    { type: 'REFERENCE/RECOMMENDATION LETTER', description: 'Create strong recommendation letters that support applications' },
    { type: 'RESIGNATION LETTER', description: 'Write professional resignation letters that maintain relationships' },
    { type: 'THANK YOU LETTER', description: 'Create heartfelt thank you letters that show appreciation' },
    { type: 'APOLOGY LETTER', description: 'Write sincere apology letters that mend relationships' },
    { type: 'COMPLAINT LETTER', description: 'Create effective complaint letters that get results' },
    { type: 'INVITATION LETTER', description: 'Write warm invitation letters that encourage attendance' },
    { type: 'CONTENT REWRITER', description: 'Rewrite content to create fresh, engaging pieces' },
    { type: 'REWRITE WITH KEYWORDS', description: 'Rewrite content while incorporating target keywords' },
    { type: 'NICHE IDEAS', description: 'Generate niche ideas for specific industries or topics' },
    { type: 'ANALYZE GIVEN CONTENT', description: 'Analyze content to identify strengths and improvement opportunities' },
    { type: 'INVESTIGATE A PARTICULAR NICHE', description: 'Investigate niche markets for business opportunities' },
    { type: 'GENERATE BUSINESS IDEAS', description: 'Generate innovative business ideas for any industry' },
    { type: 'GENERATE DIGITAL PRODUCT IDEAS', description: 'Create digital product ideas that solve real problems' },
    { type: 'GENERATE PHYSICAL PRODUCT IDEAS', description: 'Develop physical product ideas for various markets' },
    { type: 'GENERATE DOMAIN NAME IDEAS', description: 'Generate memorable domain names for your website' },
    { type: 'KEYWORD RESEARCH', description: 'Conduct comprehensive keyword research for SEO optimization' },
    { type: 'GENERATE A BUSINESS PLAN', description: 'Create comprehensive business plans for new ventures' },
    { type: 'CREATE CHAPTERS AND TOC', description: 'Structure ebooks with detailed chapter outlines' },
    { type: 'CREATE CHAPTERS', description: 'Write detailed chapters for comprehensive ebooks' },
    { type: 'EBOOK CONCLUSION', description: 'Write powerful conclusions that leave lasting impressions' },
    { type: 'CREATE A DISCLAIMER', description: 'Create legal disclaimers that protect your content' },
    { type: 'EBOOK CALL TO ACTION', description: 'Generate compelling CTAs throughout your ebook' },
    { type: 'EBOOK AUTHOR BIO', description: 'Write engaging author bios that build credibility' },
    { type: 'SEO META TAGS', description: 'Create SEO-optimized meta tags for better rankings' },
    { type: 'SEO META DESCRIPTIONS', description: 'Write compelling meta descriptions that drive clicks' },
    { type: 'PODCAST INTERVIEW QUESTIONS', description: 'Create engaging interview questions for podcast guests' },
    { type: 'DIGITAL PRODUCT REVIEW', description: 'Write comprehensive digital product reviews' },
    { type: 'PHYSICAL PRODUCT REVIEW', description: 'Create detailed physical product reviews' },
    { type: 'MINI-VSL (VIDEO SALES LETTER)', description: 'Write compelling video sales letter scripts' },
    { type: 'DIGITAL PRODUCT VIDEO', description: 'Create engaging video scripts for digital products' },
    { type: 'PHYSICAL PRODUCT VIDEO', description: 'Write compelling video scripts for physical products' },
    { type: 'SHORT AD VIDEO', description: 'Create concise ad video scripts for maximum impact' },
    { type: 'TUTORIAL VIDEO', description: 'Write instructional video scripts that teach effectively' },
    { type: 'INFORMATIONAL VIDEO', description: 'Create educational video scripts that inform and engage' },
    { type: 'ANNOUNCEMENT VIDEO', description: 'Write announcement video scripts that create excitement' },
    { type: 'FACEBOOK AD VIDEO', description: 'Create Facebook ad video scripts that convert' },
    { type: 'NEWS ANNOUNCEMENT EMAIL', description: 'Write professional news announcement emails' },
    { type: 'PRODUCT UPDATES EMAIL', description: 'Create engaging product update emails' },
    { type: 'INFORMATIONAL EMAIL', description: 'Write educational emails that provide value' },
    { type: 'GENERAL SUPPORT SCRIPT', description: 'Create helpful customer support scripts' },
    { type: 'PRODUCT/SERVICE ACCESS', description: 'Write clear access instructions for customers' },
    { type: 'SUPPORT SOLUTION FOR A PROBLEM', description: 'Create effective problem-solving support scripts' },
    { type: 'SUPPORT AUTORESPONDER MESSAGE', description: 'Write professional support autoresponder messages' },
    { type: 'ENGAGING QUESTIONS', description: 'Generate engaging questions for audience interaction' },
    { type: 'CREATIVE STORY', description: 'Write creative stories that captivate readers' },
    { type: 'SUMMARIZE TEXT', description: 'Create concise summaries of longer content' },
    { type: 'CITATIONS GENERATOR', description: 'Generate proper citations in various formats' },
    { type: 'QUOTES GENERATOR', description: 'Create inspiring quotes for various themes' },
    { type: 'TONE CHANGER', description: 'Transform content tone while maintaining meaning' },
    { type: 'SONG LYRICS', description: 'Write creative song lyrics in various genres' },
    { type: 'REAL ESTATE LISTING DESCRIPTIONS', description: 'Create compelling real estate listings' },
    { type: 'REVIEW RESPONDER', description: 'Write professional responses to customer reviews' },
    { type: 'PRODUCT NAMES', description: 'Generate creative product names for your offerings' },
    { type: 'ANALOGY MAKER', description: 'Create powerful analogies that simplify complex concepts' },
    { type: 'GROWTH IDEAS', description: 'Generate business growth strategies and ideas' },
    { type: 'KEYWORD EXTRACTOR', description: 'Extract relevant keywords from your content' },
    { type: 'LISTICLE IDEAS', description: 'Generate listicle ideas for engaging content' },
    { type: 'STARTUP IDEAS', description: 'Create innovative startup ideas for any industry' },
    { type: 'TRANSLATE', description: 'Translate content into different languages' },
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
    { type: 'YOUTUBE HASHTAGS', description: 'Generate trending hashtags that boost YouTube video visibility and reach' },
    { type: 'YOUTUBE TAGS', description: 'Create effective tags that improve YouTube search rankings and discoverability' },
    { type: 'PHYSICAL PRODUCT TEXT TO VIDEO', description: 'Transform product descriptions into captivating text-to-video prompts that bring your products to life with AI-generated visuals' },
    { type: 'PHYSICAL PRODUCT PROMOTION VIDEO WITH VEO 3', description: 'Create cutting-edge promotional videos using Google VEO 3 technology for stunning AI-generated product showcases' },
    { type: 'PHYSICAL PRODUCT SCENE-BY-SCENE NARRATIVE PROMOTION VIDEO WITH VEO 3', description: 'Craft detailed scene-by-scene narratives for VEO 3 that tell compelling product stories through AI-generated video sequences' }
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
    { type: 'YOUTUBE HASHTAGS', description: 'Generate trending hashtags that boost YouTube video visibility and reach' },
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const { isLicenseValid, licenseKey } = useLicense();
  const [selectedCategory, setSelectedCategory] = useState('All Scripts');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentForms, setRecentForms] = useState([]);
  const [recentFormTypes, setRecentFormTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;



  const getFilteredScripts = () => {
    let scripts = [];
    
    if (selectedCategory === 'All Scripts') {
      scripts = categories['All Scripts'] || [];
    } else {
      scripts = categories[selectedCategory] || [];
    }

    if (searchQuery) {
      scripts = scripts.filter(script => 
        script.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        script.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return scripts;
  };

  const filteredScripts = getFilteredScripts();
  const totalPages = Math.ceil(filteredScripts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScripts = filteredScripts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Load recent form types from AsyncStorage
  const loadRecentFormTypes = async () => {
    try {
      const recentForms = await AsyncStorage.getItem('recentForms');
      if (recentForms) {
        setRecentFormTypes(JSON.parse(recentForms));
      }
    } catch (error) {
      console.error('Error loading recent forms:', error);
    }
  };

  useEffect(() => {
    loadRecentFormTypes();
  }, []);

  const handleFormTypeClick = (formType: string) => {
    if (!isLicenseValid) {
      Alert.alert(
        'License Required',
        'Please validate your license to access this feature.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to License', onPress: () => navigation.navigate('License') }
        ]
      );
      return;
    }

    // Navigate to PromptForm with the selected form type
    navigation.navigate('PromptForm', { formType });
  };



  // Reset to page 1 when search term or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Get form details for recent form types
  const getRecentFormDetails = () => {
    return recentFormTypes.map(formType => {
      // Find the form in categories
      for (const category of Object.keys(categories)) {
        const form = categories[category].find(f => f.type === formType);
        if (form) {
          return {
            type: form.type,
            description: form.description,
            category: category
          };
        }
      }
      return null;
    }).filter(Boolean);
  };

  const recentFormDetails = getRecentFormDetails();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <ScrollView 
        style={[styles.scrollView, Platform.OS === 'web' && { height: '100vh' }]} 
        showsVerticalScrollIndicator={Platform.OS === 'web'}
        contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && { minHeight: '100%', paddingBottom: 120 }]}
        scrollEventThrottle={16}
        bounces={true}
        alwaysBounceVertical={false}
        scrollEnabled={true}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Fiddyscript</Text>
          <Text style={styles.headerSubtitle}>AI Content Assistant</Text>
        </View>

        {/* License Status */}
        <View style={styles.statusSection}>
          <View style={[styles.statusCard, { borderLeftColor: isLicenseValid ? '#4CAF50' : '#F44336' }]}>
            <View style={[styles.statusIndicator, { backgroundColor: isLicenseValid ? '#4CAF50' : '#F44336' }]}>
              <Text style={styles.statusText}>
                {isLicenseValid ? '✓ Licensed' : '✗ License Required'}
              </Text>
            </View>
            {licenseKey && (
              <Text style={styles.licenseKeyText}>License: {licenseKey}</Text>
            )}
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>Search Scripts</Text>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search scripts, categories, or descriptions..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.clearSearch}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Recent Scripts Used */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Scripts Used</Text>
          {recentFormDetails.length > 0 ? (
            <View style={styles.recentScriptsList}>
              {recentFormDetails.map((form, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.recentScriptItem}
                  onPress={() => handleFormTypeClick(form.type)}
                  activeOpacity={0.7}
                  delayPressIn={0}
                >
                  <Text style={styles.recentScriptTitle}>{form.type}</Text>
                  <Text style={styles.recentScriptCategory}>📁 {form.category}</Text>
                  <Text style={styles.recentScriptDescription}>{form.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🎯</Text>
              <Text style={styles.emptyTitle}>No forms used yet</Text>
              <Text style={styles.emptyDescription}>
                Use your first form to get started
              </Text>
            </View>
          )}
        </View>

        {/* Category Tabs */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryTabs}
            scrollEnabled
          >
            {categoryNames.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryTab,
                  selectedCategory === category && styles.activeCategoryTab
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
                delayPressIn={0}
              >
                <Text style={[
                  styles.categoryTabText,
                  selectedCategory === category && styles.activeCategoryTabText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Scripts Grid */}
        <View style={styles.scriptsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All Scripts' ? 'All Scripts' : selectedCategory}
            {searchQuery && ` - Search Results`}
          </Text>
          <Text style={styles.resultsCount}>
            {filteredScripts.length} scripts available
          </Text>
          
          <View style={styles.scriptsGrid}>
            {currentScripts.map((form, index) => (
              <TouchableOpacity
                key={`${form.type}-${index}`}
                style={styles.scriptCard}
                onPress={() => handleFormTypeClick(form.type)}
                activeOpacity={0.7}
                delayPressIn={0}
              >
                <View style={styles.scriptCardHeader}>
                  <Text style={styles.scriptType}>{form.type}</Text>
                  {selectedCategory === 'All Scripts' && (
                    <Text style={styles.scriptCategory}>📁 {form.category}</Text>
                  )}
                </View>
                <Text style={styles.scriptDescription}>{form.description}</Text>
                <View style={styles.scriptCardFooter}>
                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => handleFormTypeClick(form.type)}
                  >
                    <Text style={styles.continueButtonText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === 1 && styles.paginationButtonDisabled]}
                onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <Text style={[styles.paginationButtonText, currentPage === 1 && styles.paginationButtonTextDisabled]}>
                  ← Previous
                </Text>
              </TouchableOpacity>
              
              <View style={styles.paginationInfo}>
                <Text style={styles.paginationText}>
                  Page {currentPage} of {totalPages}
                </Text>
              </View>
              
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === totalPages && styles.paginationButtonDisabled]}
                onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <Text style={[styles.paginationButtonText, currentPage === totalPages && styles.paginationButtonTextDisabled]}>
                  Next →
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>



        {/* Scripts Navigation Button */}
        <View style={styles.scriptsSection}>
          <TouchableOpacity
            style={styles.scriptsButton}
            onPress={() => navigation.navigate('Scripts')}
          >
            <Text style={styles.scriptsButtonIcon}>📝</Text>
            <Text style={styles.scriptsButtonTitle}>Scripts & Forms</Text>
            <Text style={styles.scriptsButtonSubtitle}>Browse all content types</Text>
          </TouchableOpacity>
        </View>

                            {/* Text to Speech Navigation Button */}
                    <View style={styles.scriptsSection}>
                      <TouchableOpacity
                        style={styles.scriptsButton}
                        onPress={() => navigation.navigate('TextToSpeech')}
                      >
                        <Text style={styles.scriptsButtonIcon}>🔊</Text>
                        <Text style={styles.scriptsButtonTitle}>Text to Speech</Text>
                        <Text style={styles.scriptsButtonSubtitle}>Convert text to audio</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Humanizer Navigation Button */}
                    <View style={styles.scriptsSection}>
                      <TouchableOpacity
                        style={styles.scriptsButton}
                        onPress={() => navigation.navigate('Humanizer')}
                      >
                        <Text style={styles.scriptsButtonIcon}>🎭</Text>
                        <Text style={styles.scriptsButtonTitle}>Content Humanizer</Text>
                        <Text style={styles.scriptsButtonSubtitle}>Make AI content more human-like</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Tutorials Navigation Button */}
                    <View style={styles.scriptsSection}>
                      <TouchableOpacity
                        style={styles.scriptsButton}
                        onPress={() => navigation.navigate('Tutorials')}
                      >
                        <Text style={styles.scriptsButtonIcon}>📚</Text>
                        <Text style={styles.scriptsButtonTitle}>Tutorials</Text>
                        <Text style={styles.scriptsButtonSubtitle}>Learn with video guides</Text>
                      </TouchableOpacity>
                    </View>

                    {/* License Info Navigation Button */}
                    <View style={styles.scriptsSection}>
                      <TouchableOpacity
                        style={styles.scriptsButton}
                        onPress={() => navigation.navigate('LicenseInfo')}
                      >
                        <Text style={styles.scriptsButtonIcon}>🔐</Text>
                        <Text style={styles.scriptsButtonTitle}>License Info</Text>
                        <Text style={styles.scriptsButtonSubtitle}>View license details & status</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Help Navigation Button */}
                    <View style={styles.scriptsSection}>
                      <TouchableOpacity
                        style={styles.scriptsButton}
                        onPress={() => navigation.navigate('Help')}
                      >
                        <Text style={styles.scriptsButtonIcon}>🆘</Text>
                        <Text style={styles.scriptsButtonTitle}>Help & Support</Text>
                        <Text style={styles.scriptsButtonSubtitle}>Get help & send feedback</Text>
                      </TouchableOpacity>
                    </View>

                    {/* User Profile Navigation Button */}
                    <View style={styles.scriptsSection}>
                      <TouchableOpacity
                        style={styles.scriptsButton}
                        onPress={() => navigation.navigate('UserProfile')}
                      >
                        <Text style={styles.scriptsButtonIcon}>👤</Text>
                        <Text style={styles.scriptsButtonTitle}>User Profile</Text>
                        <Text style={styles.scriptsButtonSubtitle}>Manage your role & permissions</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Settings Navigation Button */}
                    <View style={styles.scriptsSection}>
                      <TouchableOpacity
                        style={styles.scriptsButton}
                        onPress={() => navigation.navigate('Settings')}
                      >
                        <Text style={styles.scriptsButtonIcon}>⚙️</Text>
                        <Text style={styles.scriptsButtonTitle}>Settings</Text>
                        <Text style={styles.scriptsButtonSubtitle}>Configure app & API keys</Text>
                      </TouchableOpacity>
                    </View>

        {/* Browser Section */}
        <BrowserSection 
          title="Quick Web Access"
          description="Access research tools and content creation platforms"
          showBookmarks={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'web' ? 100 : 20,
  },
  header: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 5,
  },
  statusSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  licenseKeyText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearSearch: {
    fontSize: 18,
    color: '#999',
    padding: 4,
  },
  categorySection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  categoryTabs: {
    flexDirection: 'row',
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeCategoryTab: {
    backgroundColor: '#007AFF',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeCategoryTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scriptsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  scriptsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  scriptCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scriptCardHeader: {
    marginBottom: 8,
  },
  scriptType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  scriptCategory: {
    fontSize: 12,
    color: '#666',
  },
  scriptDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  scriptCardFooter: {
    alignItems: 'flex-end',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  recentSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  recentScriptsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recentScriptItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 4,
  },
  recentScriptTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recentScriptCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  recentScriptDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    lineHeight: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  // Pagination Styles
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paginationButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  paginationButtonDisabled: {
    backgroundColor: '#ccc',
  },
  paginationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paginationButtonTextDisabled: {
    color: '#999',
  },
  paginationInfo: {
    alignItems: 'center',
  },
  paginationText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  scriptsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scriptsButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scriptsButtonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  scriptsButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  scriptsButtonSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;
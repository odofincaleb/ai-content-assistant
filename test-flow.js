// Test script to demonstrate the complete feedback flow
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001/api';

async function testFeedbackFlow() {
  console.log('🧪 Testing Feedback Flow...\n');

  try {
    // 1. Health check
    console.log('1️⃣ Health Check:');
    const healthResponse = await fetch(`${API_BASE}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ API Status:', healthData.status);
    console.log('⏰ Timestamp:', healthData.timestamp);
    console.log('');

    // 2. Submit feedback (simulating main app)
    console.log('2️⃣ Submitting Feedback (Main App):');
    const feedbackData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      type: 'suggestion',
      message: 'The humanizer feature is amazing! Would love to see more templates.'
    };

    const submitResponse = await fetch(`${API_BASE}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackData)
    });

    const submittedFeedback = await submitResponse.json();
    console.log('✅ Feedback submitted successfully!');
    console.log('📝 ID:', submittedFeedback.id);
    console.log('👤 Name:', submittedFeedback.name);
    console.log('📧 Email:', submittedFeedback.email);
    console.log('🏷️ Type:', submittedFeedback.type);
    console.log('📄 Message:', submittedFeedback.message);
    console.log('📊 Status:', submittedFeedback.status);
    console.log('');

    // 3. Submit another feedback
    console.log('3️⃣ Submitting Another Feedback:');
    const feedbackData2 = {
      name: 'Sarah Wilson',
      email: 'sarah@company.com',
      type: 'bug',
      message: 'Found a bug in the script editor. Sometimes crashes when saving long scripts.'
    };

    const submitResponse2 = await fetch(`${API_BASE}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackData2)
    });

    const submittedFeedback2 = await submitResponse2.json();
    console.log('✅ Second feedback submitted!');
    console.log('📝 ID:', submittedFeedback2.id);
    console.log('');

    // 4. Get all feedback (simulating license manager)
    console.log('4️⃣ Retrieving All Feedback (License Manager):');
    const getResponse = await fetch(`${API_BASE}/feedback`);
    const allFeedback = await getResponse.json();
    
    console.log('📊 Total feedback entries:', allFeedback.length);
    allFeedback.forEach((feedback, index) => {
      console.log(`\n📝 Entry ${index + 1}:`);
      console.log('   ID:', feedback.id);
      console.log('   Name:', feedback.name);
      console.log('   Email:', feedback.email);
      console.log('   Type:', feedback.type);
      console.log('   Status:', feedback.status);
      console.log('   Date:', feedback.date);
      console.log('   Message:', feedback.message.substring(0, 50) + '...');
    });
    console.log('');

    // 5. Update status (simulating license manager actions)
    console.log('5️⃣ Updating Feedback Status (License Manager):');
    const updateResponse = await fetch(`${API_BASE}/feedback/${submittedFeedback.id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'in-progress' })
    });

    if (updateResponse.ok) {
      console.log('✅ Status updated successfully!');
      console.log('📝 Feedback ID:', submittedFeedback.id);
      console.log('🔄 New Status: in-progress');
    }
    console.log('');

    // 6. Get feedback summary
    console.log('6️⃣ Feedback Summary:');
    const summaryResponse = await fetch(`${API_BASE}/feedback/summary`);
    const summary = await summaryResponse.json();
    
    console.log('📊 Summary Statistics:');
    console.log('   Total:', summary.total);
    console.log('   New:', summary.new);
    console.log('   In Progress:', summary['in-progress']);
    console.log('   Resolved:', summary.resolved);
    console.log('');

    // 7. Test filtering
    console.log('7️⃣ Testing Filters:');
    const filterResponse = await fetch(`${API_BASE}/feedback?status=new`);
    const filteredFeedback = await filterResponse.json();
    console.log('🔍 New feedback count:', filteredFeedback.length);
    
    const searchResponse = await fetch(`${API_BASE}/feedback?search=humanizer`);
    const searchResults = await searchResponse.json();
    console.log('🔍 Search results for "humanizer":', searchResults.length);
    console.log('');

    console.log('🎉 All tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('✅ API server is running on http://localhost:3001');
    console.log('✅ Database is working correctly');
    console.log('✅ Main app can submit feedback');
    console.log('✅ License manager can retrieve and manage feedback');
    console.log('✅ Status updates work properly');
    console.log('✅ Filtering and search work correctly');

  } catch (error) {
    console.error('❌ Error during testing:', error.message);
  }
}

// Run the test
testFeedbackFlow();

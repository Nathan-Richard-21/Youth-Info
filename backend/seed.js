const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

// Import models
const User = require('./models/User');
const Opportunity = require('./models/Opportunity');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Nate:Nathan@2001@clusterinfo.orhwuyp.mongodb.net/youthportal';

// Demo opportunities data
const demoOpportunities = [
  {
    title: 'NSFAS Bursary 2026 Application',
    description: 'The National Student Financial Aid Scheme (NSFAS) is calling for applications from eligible students who need financial assistance to study at public universities and TVET colleges. NSFAS provides comprehensive funding covering tuition, accommodation, transport, and living allowances.',
    category: 'bursary',
    subcategory: 'Undergraduate',
    organization: 'NSFAS',
    contactEmail: 'info@nsfas.org.za',
    website: 'https://www.nsfas.org.za',
    location: 'National',
    eligibility: 'South African citizens with household income below R350,000 per year',
    requirements: ['South African ID', 'Matric certificate', 'Proof of household income', 'University acceptance letter'],
    deadline: '2026-01-31',
    amount: 'Full funding',
    fundingType: 'Full',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    tags: ['bursary', 'undergraduate', 'national', 'full-funding'],
    featured: true,
    status: 'approved'
  },
  {
    title: 'Software Developer - Permanent Position',
    description: 'Leading tech company in Port Elizabeth is seeking an experienced Software Developer to join our dynamic team. You will work on cutting-edge projects, developing web and mobile applications using modern technologies. Great opportunity for career growth and development.',
    category: 'career',
    subcategory: 'IT & Technology',
    organization: 'TechSolutions PE',
    contactEmail: 'careers@techsolutions.co.za',
    contactPhone: '041-123-4567',
    website: 'https://www.techsolutions.co.za',
    location: 'Port Elizabeth',
    eligibility: 'Degree/Diploma in Computer Science or related field',
    requirements: ['3+ years experience', 'JavaScript, React, Node.js', 'Git version control', 'Problem-solving skills'],
    employmentType: 'Full-time',
    salary: 'R25,000 - R40,000',
    experience: '3-5 years',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    tags: ['career', 'software', 'developer', 'it', 'port-elizabeth'],
    status: 'approved'
  },
  {
    title: 'Artisan Learnership Programme 2026',
    description: 'Join our comprehensive Artisan Learnership Programme where you will receive theoretical training combined with practical workplace experience. This 24-month programme covers various trades including electrical, plumbing, and fitting. Upon completion, you will receive a nationally recognized qualification.',
    category: 'learnership',
    subcategory: 'Technical',
    organization: 'Skills Development Authority',
    contactEmail: 'learnerships@sda.org.za',
    contactPhone: '043-987-6543',
    location: 'East London',
    eligibility: 'Grade 12 certificate, ages 18-35',
    requirements: ['Matric with Math and Science', 'South African ID', 'Clean criminal record'],
    startDate: '2026-02-01',
    deadline: '2026-01-15',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    tags: ['learnership', 'artisan', 'technical', 'east-london'],
    status: 'approved',
    urgent: true
  },
  {
    title: 'NYDA Business Grant - Up to R100,000',
    description: 'The National Youth Development Agency offers grants to young entrepreneurs to start or expand their businesses. This is a non-refundable grant designed to support youth-owned businesses in various sectors. Successful applicants receive business mentorship and support services.',
    category: 'business',
    subcategory: 'Grant',
    organization: 'NYDA',
    contactEmail: 'grants@nyda.gov.za',
    website: 'https://www.nyda.gov.za',
    location: 'Eastern Cape',
    eligibility: 'South African youth aged 18-35 with a viable business idea',
    requirements: ['Business plan', 'SA ID', 'Proof of address', 'Bank statements'],
    deadline: '2026-03-31',
    amount: 'Up to R100,000',
    fundingType: 'Grant',
    imageUrl: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
    tags: ['business', 'grant', 'nyda', 'entrepreneur', 'eastern-cape'],
    featured: true,
    status: 'approved'
  },
  {
    title: 'Nursing Assistant Position - Livingstone Hospital',
    description: 'Livingstone Hospital in Port Elizabeth is seeking compassionate and dedicated Nursing Assistants to join our healthcare team. This is an excellent opportunity to start your career in healthcare while making a difference in patients\' lives.',
    category: 'career',
    subcategory: 'Healthcare',
    organization: 'Livingstone Hospital',
    contactEmail: 'hr@livingstone.gov.za',
    contactPhone: '041-405-2911',
    location: 'Port Elizabeth',
    eligibility: 'Nursing Assistant Certificate',
    requirements: ['Registered with SANC', 'Basic computer literacy', 'Good communication skills'],
    employmentType: 'Full-time',
    salary: 'R12,000 - R18,000',
    experience: '0-2 years',
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800',
    tags: ['career', 'nursing', 'healthcare', 'hospital', 'port-elizabeth'],
    status: 'approved'
  },
  {
    title: 'Digital Marketing Internship - 12 Months',
    description: 'Exciting 12-month internship opportunity in digital marketing. You will learn about social media marketing, content creation, SEO, and digital advertising while working on real campaigns for local businesses. Includes monthly stipend and potential for permanent placement.',
    category: 'career',
    subcategory: 'Internship',
    organization: 'Digital Edge Marketing',
    contactEmail: 'internships@digitaledge.co.za',
    location: 'Nelson Mandela Bay',
    eligibility: 'Marketing/Communications degree or diploma',
    requirements: ['Marketing qualification', 'Basic social media knowledge', 'Creative mindset'],
    employmentType: 'Internship',
    salary: 'R5,000 stipend',
    experience: '0-1 years',
    startDate: '2026-02-01',
    deadline: '2026-01-20',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    tags: ['internship', 'marketing', 'digital', 'social-media'],
    status: 'approved'
  },
  {
    title: 'Rhodes University Postgraduate Bursaries',
    description: 'Rhodes University offers competitive bursaries for postgraduate students pursuing Masters and Doctoral degrees. These bursaries cover tuition fees and provide a monthly living allowance to enable full-time study. Priority given to research in fields aligned with national development priorities.',
    category: 'bursary',
    subcategory: 'Postgraduate',
    organization: 'Rhodes University',
    contactEmail: 'postgrad@ru.ac.za',
    website: 'https://www.ru.ac.za',
    location: 'Grahamstown',
    eligibility: 'Excellent academic record, admission to postgraduate programme',
    requirements: ['Honours degree', 'Research proposal', 'Academic transcripts', 'Reference letters'],
    deadline: '2026-02-28',
    amount: 'R80,000 - R150,000 per year',
    fundingType: 'Full',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
    tags: ['bursary', 'postgraduate', 'masters', 'phd', 'research'],
    status: 'approved'
  },
  {
    title: 'Buffalo City Youth Employment Programme',
    description: 'Buffalo City Municipality launches its annual Youth Employment Programme offering temporary work opportunities across various municipal departments. Participants gain valuable work experience while earning an income. Programme duration is 12 months with comprehensive training.',
    category: 'career',
    subcategory: 'Government Programme',
    organization: 'Buffalo City Municipality',
    contactEmail: 'youth@buffalocity.gov.za',
    location: 'Buffalo City',
    eligibility: 'Unemployed youth aged 18-35 residing in Buffalo City',
    requirements: ['SA ID', 'Matric certificate', 'Proof of residence', 'No previous municipal employment'],
    startDate: '2026-04-01',
    deadline: '2026-02-15',
    salary: 'R3,500 monthly stipend',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800',
    tags: ['career', 'youth', 'government', 'buffalo-city', 'temporary'],
    status: 'approved'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Create admin user if doesn't exist
    console.log('\nChecking for admin user...');
    let adminUser = await User.findOne({ email: 'admin@youthportal.co.za' });
    
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@youthportal.co.za',
        password: hashedPassword,
        role: 'admin',
        isActive: true
      });
      console.log('✓ Admin user created (email: admin@youthportal.co.za, password: admin123)');
    } else {
      console.log('✓ Admin user already exists');
    }

    // Check if opportunities already exist
    const existingOppsCount = await Opportunity.countDocuments();
    
    if (existingOppsCount > 0) {
      console.log(`\n${existingOppsCount} opportunities already exist in database.`);
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const answer = await new Promise(resolve => {
        readline.question('Do you want to clear and re-seed? (yes/no): ', resolve);
      });
      readline.close();
      
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        await Opportunity.deleteMany({});
        console.log('✓ Cleared existing opportunities');
      } else {
        console.log('Keeping existing opportunities');
        mongoose.connection.close();
        return;
      }
    }

    // Insert demo opportunities
    console.log('\nSeeding demo opportunities...');
    const opportunities = await Opportunity.insertMany(
      demoOpportunities.map(opp => ({
        ...opp,
        createdBy: adminUser._id,
        views: Math.floor(Math.random() * 500) + 50,
        applications: Math.floor(Math.random() * 50)
      }))
    );
    
    console.log(`✓ Successfully created ${opportunities.length} demo opportunities`);
    
    console.log('\n=== Seed Summary ===');
    console.log(`Total Opportunities: ${opportunities.length}`);
    console.log(`  - Bursaries: ${opportunities.filter(o => o.category === 'bursary').length}`);
    console.log(`  - Careers: ${opportunities.filter(o => o.category === 'career').length}`);
    console.log(`  - Learnerships: ${opportunities.filter(o => o.category === 'learnership').length}`);
    console.log(`  - Business Funding: ${opportunities.filter(o => o.category === 'business').length}`);
    console.log(`  - Featured: ${opportunities.filter(o => o.featured).length}`);
    console.log(`  - Urgent: ${opportunities.filter(o => o.urgent).length}`);
    
    console.log('\n✓ Database seeded successfully!');
    console.log('\nAdmin credentials:');
    console.log('  Email: admin@youthportal.co.za');
    console.log('  Password: admin123');
    
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seed
seedDatabase();

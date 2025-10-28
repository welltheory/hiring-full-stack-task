import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { sample } from 'lodash';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.notificationDigest.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.user.deleteMany({});

  // Create timestamps for different time periods
  const yesterday = dayjs().subtract(24, 'hours');
  const twoDaysAgo = dayjs().subtract(48, 'hours');
  const oneWeekAgo = dayjs().subtract(7, 'days');

  // Deterministic user ID for frontend .env configuration
  // This user ID is hardcoded in frontend/.env.example for the hiring task demo
  // Format: CUID (25 characters, starts with 'cl')
  const DEMO_USER_ID = 'cldemoalice00000000000000';

  // Create test users with varying notification patterns
  const users = [
    {
      id: DEMO_USER_ID, // Fixed ID for demo user (Alice)
      email: 'alice@example.com',
      firstName: 'Alice',
      lastName: 'Johnson',
      notificationCount: 5,
    },
    {
      email: 'bob@example.com',
      firstName: 'Bob',
      lastName: 'Smith',
      notificationCount: 12,
    },
    {
      email: 'charlie@example.com',
      firstName: 'Charlie',
      lastName: 'Davis',
      notificationCount: 0, // Edge case: no notifications
    },
    {
      email: 'diana@example.com',
      firstName: 'Diana',
      lastName: 'Martinez',
      notificationCount: 3,
    },
    {
      email: 'evan@example.com',
      firstName: 'Evan',
      lastName: 'Wilson',
      notificationCount: 20,
    },
    {
      email: 'fiona@example.com',
      firstName: 'Fiona',
      lastName: 'Brown',
      notificationCount: 7,
    },
    {
      email: 'george@example.com',
      firstName: 'George',
      lastName: 'Taylor',
      notificationCount: 1, // Edge case: single notification
    },
    {
      email: 'hannah@example.com',
      firstName: 'Hannah',
      lastName: 'Anderson',
      notificationCount: 50, // Edge case: many notifications
    },
    {
      email: 'ian@example.com',
      firstName: 'Ian',
      lastName: 'Thomas',
      notificationCount: 8,
    },
    {
      email: 'julia@example.com',
      firstName: 'Julia',
      lastName: 'Moore',
      notificationCount: 15,
    },
  ];

  const notificationTypes = [
    'user_created',
    'user_updated',
    'user_deleted',
    'system_alert',
    'reminder',
  ];

  const notificationTemplates = [
    'New user {name} registered',
    'User {name} updated their profile',
    'User {name} was deleted',
    'System maintenance scheduled for tonight at 2 AM',
    'Your weekly report is ready for review',
    'New message from {name}',
    'Action required: Please review your settings',
    'Reminder: Team meeting tomorrow at 10 AM',
    'Your subscription expires in 7 days',
    'Security alert: New login detected',
    'Successfully completed data backup',
    'Failed to send email to {name}',
  ];

  for (const userData of users) {
    console.log(`Creating user: ${userData.email} with ${userData.notificationCount} notifications`);

    const user = await prisma.user.create({
      data: {
        id: 'id' in userData ? userData.id : undefined,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    });

    // Create notifications from "yesterday" (last 24 hours) - these SHOULD be included in digest
    for (let i = 0; i < userData.notificationCount; i++) {
      const type = sample(notificationTypes)!;
      const template = sample(notificationTemplates)!;
      const message = template.replace('{name}', `${userData.firstName} ${userData.lastName}`);

      // Create notifications at various times throughout "yesterday"
      const hoursOffset = i * (24 / userData.notificationCount);
      const notificationTime = yesterday.clone().add(hoursOffset, 'hours').toDate();

      await prisma.notification.create({
        data: {
          userId: user.id,
          type,
          message,
          createdAt: notificationTime,
        },
      });
    }

    // Create older notifications - these should NOT be included in digest
    // This tests if candidate properly filters by date range
    const olderNotificationsCount = Math.min(3, Math.floor(userData.notificationCount / 2));
    for (let i = 0; i < olderNotificationsCount; i++) {
      const type = sample(notificationTypes)!;
      const template = sample(notificationTemplates)!;
      const message = template.replace('{name}', `${userData.firstName} ${userData.lastName}`);

      // Mix of 2 days ago and 1 week ago notifications
      const baseTime = i % 2 === 0 ? twoDaysAgo : oneWeekAgo;
      const notificationTime = baseTime.clone().subtract(Math.random() * 12, 'hours').toDate();

      await prisma.notification.create({
        data: {
          userId: user.id,
          type,
          message,
          createdAt: notificationTime,
        },
      });
    }
  }

  const totalUsers = await prisma.user.count();
  const totalNotifications = await prisma.notification.count();

  console.log('✅ Seeding complete!');
  console.log(`   Created ${totalUsers} users`);
  console.log(`   Created ${totalNotifications} notifications`);
  console.log('');
  console.log('💡 Test data includes:');
  console.log('   - Users with 0, 1, 3-50 notifications (edge cases)');
  console.log('   - Recent notifications from last 24 hours (should be in digest)');
  console.log('   - Older notifications from 2-7 days ago (should be filtered out)');
  console.log('   - Ready for daily digest generation testing');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
  });

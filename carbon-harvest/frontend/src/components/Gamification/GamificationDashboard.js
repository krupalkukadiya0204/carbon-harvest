import React from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Heading,
  Text,
  Flex,
  Stack,
  Badge,
} from '@chakra-ui/react';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import './Gamification.css';
import Leaderboard from './Leaderboard';
import Achievements from './Achievements';
import Challenges from './Challenges';

/**
 * GamificationDashboard Component - Main dashboard for gamification features
 * Displays user stats, achievements, challenges, and leaderboard
 * @returns {JSX.Element} GamificationDashboard component
 */
const GamificationDashboard = () => {
  const bgColor = 'gray.50';
  const tabBg = 'white';
  const [userStats, setUserStats] = React.useState({
    points: 0,
    level: 1,
    rank: 0
  });

  React.useEffect(() => {
    // Fetch user stats
    const fetchUserStats = async () => {
      try {
        const response = await fetch('/api/gamification/stats');
        const data = await response.json();
        setUserStats(data);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Stack spacing={6} mb={8}>
          <Flex justify="space-between" align="center">
            <Heading size="xl">Gamification Dashboard</Heading>
            <Badge colorScheme="green" p={2} borderRadius="md" fontSize="md">
              Level {userStats.level}
            </Badge>
          </Flex>
          <Flex gap={4} wrap="wrap">
            <Box p={4} bg={tabBg} borderRadius="lg" flex={1} minW="200px">
              <Flex align="center" gap={2}>
                <FaTrophy color="#FFD700" />
                <Text fontSize="lg">Total Points</Text>
              </Flex>
              <Text fontSize="3xl" fontWeight="bold">{userStats.points}</Text>
            </Box>
            <Box p={4} bg={tabBg} borderRadius="lg" flex={1} minW="200px">
              <Flex align="center" gap={2}>
                <FaMedal color="#C0C0C0" />
                <Text fontSize="lg">Rank</Text>
              </Flex>
              <Text fontSize="3xl" fontWeight="bold">#{userStats.rank}</Text>
            </Box>
          </Flex>
        </Stack>
        <Tabs variant="enclosed" bg={tabBg} borderRadius="lg" shadow="sm">
          <TabList>
            <Tab>Leaderboard</Tab>
            <Tab>Achievements</Tab>
            <Tab>Challenges</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Leaderboard />
            </TabPanel>
            <TabPanel>
              <Achievements />
            </TabPanel>
            <TabPanel>
              <Challenges />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default GamificationDashboard;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Box,
  Grid,
  Heading,
  Progress,
  Text,
  VStack,
  Badge,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaTrophy, FaMedal, FaCalendarCheck } from 'react-icons/fa';

/**
 * AchievementCard Component - Displays individual achievement information
 * @param {Object} props - Component props
 * @param {Object} props.achievement - Achievement data
 * @returns {JSX.Element} Achievement card component
 */
const AchievementCard = ({ achievement }) => {
  const bgColor = 'white';
  const borderColor = 'gray.200';

  const getIcon = (type) => {
    switch (type) {
      case 'BADGE':
        return FaMedal;
      case 'CHALLENGE':
        return FaTrophy;
      case 'STREAK':
        return FaCalendarCheck;
      default:
        return FaMedal;
    }
  };

  const getProgress = () => {
    if (achievement.type === 'CHALLENGE' && achievement.progress) {
      return (achievement.progress.current / achievement.progress.target) * 100;
    }
    return achievement.completed ? 100 : 0;
  };

  return (
    <Box
      bg={bgColor}
      p={4}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      shadow="sm"
    >
      <Flex align="center" mb={2}>
        <Icon as={getIcon(achievement.type)} mr={2} color="green.500" />
        <Heading size="sm">{achievement.name}</Heading>
      </Flex>
      <Text fontSize="sm" color="gray.600" mb={2}>
        {achievement.description}
      </Text>
      {achievement.type === 'STREAK' && (
        <Badge colorScheme="purple" mb={2}>
          {achievement.streakCount} day streak
        </Badge>
      )}
      {achievement.type === 'CHALLENGE' && (
        <VStack align="stretch" spacing={2}>
          <Progress
            value={getProgress()}
            colorScheme="green"
            size="sm"
            borderRadius="full"
          />
          <Text fontSize="xs" textAlign="right">
            {achievement.progress?.current || 0} / {achievement.progress?.target || 0}
          </Text>
        </VStack>
      )}
      <Badge
        colorScheme={achievement.completed ? 'green' : 'blue'}
        mt={2}
      >
        {achievement.points} points
      </Badge>
    </Box>
  );
};

AchievementCard.propTypes = {
  achievement: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['BADGE', 'CHALLENGE', 'STREAK', 'REFERRAL']).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    progress: PropTypes.shape({
      current: PropTypes.number,
      target: PropTypes.number
    }),
    completed: PropTypes.bool,
    points: PropTypes.number.isRequired,
    streakCount: PropTypes.number
  }).isRequired
};

/**
 * Achievements Component - Displays user's achievements and badges
 * @returns {JSX.Element} Achievements component
 */
const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get('/api/gamification/achievements');
        setAchievements(response.data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <Box p={4}>
      <Heading size="lg" mb={6}>Your Achievements</Heading>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={4}
      >
        {achievements.map((achievement) => (
          <AchievementCard key={achievement._id} achievement={achievement} />
        ))}
      </Grid>
    </Box>
  );
};

export default Achievements;

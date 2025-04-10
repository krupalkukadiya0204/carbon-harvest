/**
 * @file Leaderboard.js - Gamification leaderboard component
 * @module Leaderboard
 */

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Badge,
  useToast,
} from '@chakra-ui/react';

// Constants
const REFRESH_INTERVAL = 300000; // 5 minutes in milliseconds
const API_ENDPOINT = '/api/gamification/leaderboard';

/**
 * Leaderboard Component - Displays real-time carbon credit rankings
 * @component
 * @returns {JSX.Element} Leaderboard with user rankings and achievements
 */
const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const bgColor = 'white';
  const borderColor = 'gray.200';

  /**
   * Fetches leaderboard data from the API
   */
  const fetchLeaderboard = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_ENDPOINT);
      setLeaderboard(response.data);
    } catch (error) {
      toast({
        title: 'Error fetching leaderboard',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  // Show loading state
  if (isLoading) {
    return (
      <Box p={4} bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
        <Heading size="md" mb={4}>Loading Leaderboard...</Heading>
      </Box>
    );
  }

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      p={4}
      shadow="sm"
      position="relative"
    >
      <Heading size="md" mb={4}>Carbon Credits Leaderboard</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>User</Th>
            <Th>Points</Th>
            <Th>Badges</Th>
          </Tr>
        </Thead>
        <Tbody>
          {leaderboard.map((entry, index) => (
            <Tr key={entry._id}>
              <Td>
                {index + 1}
                {index < 3 && (
                  <Badge ml={2} colorScheme={index === 0 ? 'yellow' : index === 1 ? 'gray' : 'orange'}>
                    {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
                  </Badge>
                )}
              </Td>
              <Td>{entry.user[0].name}</Td>
              <Td>{entry.totalPoints}</Td>
              <Td>
                {entry.user[0].badges?.map((badge, i) => (
                  <Badge key={i} ml={1} colorScheme="green">
                    {badge}
                  </Badge>
                ))}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Leaderboard;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  VStack,
  Progress,
  Badge,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

/**
 * ChallengeCard Component - Displays individual challenge information
 * @param {Object} props - Component props
 * @param {Object} props.challenge - Challenge data
 * @param {Function} props.onUpdateProgress - Callback when progress is updated
 * @returns {JSX.Element} Challenge card component
 */
const ChallengeCard = ({ challenge, onUpdateProgress }) => {
  const bgColor = 'white';
  const borderColor = 'gray.200';
  const toast = useToast();

  const handleProgressUpdate = async (newProgress) => {
    try {
      await axios.put('/api/gamification/challenge/progress', {
        challengeId: challenge._id,
        progress: newProgress
      });
      onUpdateProgress();
      toast({
        title: 'Progress updated',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error updating progress',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const progress = (challenge.progress.current / challenge.progress.target) * 100;
  const daysLeft = Math.ceil((new Date(challenge.expiresAt) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <Box
      bg={bgColor}
      p={4}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      shadow="sm"
    >
      <VStack align="stretch" spacing={3}>
        <Heading size="sm">{challenge.name}</Heading>
        <Text fontSize="sm" color="gray.600">
          {challenge.description}
        </Text>
        <Progress
          value={progress}
          colorScheme="green"
          size="sm"
          borderRadius="full"
        />
        <Text fontSize="xs">
          Progress: {challenge.progress.current} / {challenge.progress.target}
        </Text>
        <Badge colorScheme={daysLeft <= 3 ? 'red' : 'blue'}>
          {daysLeft} days left
        </Badge>
        <Button
          size="sm"
          colorScheme="green"
          onClick={() => handleProgressUpdate(challenge.progress.current + 1)}
          isDisabled={challenge.completed}
        >
          Update Progress
        </Button>
      </VStack>
    </Box>
  );
};

ChallengeCard.propTypes = {
  challenge: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    progress: PropTypes.shape({
      current: PropTypes.number.isRequired,
      target: PropTypes.number.isRequired
    }).isRequired,
    completed: PropTypes.bool.isRequired,
    expiresAt: PropTypes.string.isRequired
  }).isRequired,
  onUpdateProgress: PropTypes.func.isRequired
};

/**
 * CreateChallengeModal Component - Modal for creating new challenges
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Callback when modal is closed
 * @param {Function} props.onChallengeCreated - Callback when challenge is created
 * @returns {JSX.Element} Create challenge modal component
 */
const CreateChallengeModal = ({ isOpen, onClose, onChallengeCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    target: '',
    expiresAt: ''
  });
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/gamification/challenge', formData);
      onChallengeCreated();
      onClose();
      toast({
        title: 'Challenge created',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error creating challenge',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Challenge</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Challenge Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Target Value</FormLabel>
                <Input
                  type="number"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Expiry Date</FormLabel>
                <Input
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                />
              </FormControl>
              <Button type="submit" colorScheme="green" width="100%">
                Create Challenge
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

CreateChallengeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChallengeCreated: PropTypes.func.isRequired
};

/**
 * Challenges Component - Displays and manages user challenges
 * @returns {JSX.Element} Challenges component
 */
const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchChallenges = async () => {
    try {
      const response = await axios.get('/api/gamification/achievements');
      setChallenges(response.data.filter(a => a.type === 'CHALLENGE'));
    } catch (error) {
      toast({
        title: 'Error fetching challenges',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  React.useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <Box p={4}>
      <Box mb={6} display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="lg">Active Challenges</Heading>
        <Button colorScheme="green" onClick={onOpen}>
          Create Challenge
        </Button>
      </Box>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={4}
      >
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge._id}
            challenge={challenge}
            onUpdateProgress={fetchChallenges}
          />
        ))}
      </Grid>
      <CreateChallengeModal
        isOpen={isOpen}
        onClose={onClose}
        onChallengeCreated={fetchChallenges}
      />
    </Box>
  );
};

export default Challenges;

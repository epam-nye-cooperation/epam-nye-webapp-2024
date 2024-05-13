import { CloseIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { MovieEditorStatus } from './movie-editor-form';
import doneIcon from '../../images/done.svg';

export interface MovieEditorFeedbackProps {
  status: MovieEditorStatus;
}

export const MovieEditorFeedback: FC<MovieEditorFeedbackProps> = ({ status }) => {
  const isError = status === MovieEditorStatus.ERROR
  const statusText = (() => {
    if (isError) {
      return 'A módosítás során hiba történt, kérjük próbálja újból!';
    }
    return status === MovieEditorStatus.ADDED
      ? 'A film sikeresen hozzáadásra került az adatbázisba'
      : 'A film módosítása sikeresen megtörtént';
  })();
  return (
    <VStack gap={8}>
      {isError ? (
        <IconButton
          as={Box}
          icon={<CloseIcon />}
          aria-label=''
          backgroundColor="text.highlighted"
          color="text.default"
          borderRadius="50%"
          fontSize="3xl"
          height="2.1334em"
          width="2.1334em"
        />
      ) : (
        <Image src={doneIcon} width="4em" />
      )}
      <Heading fontSize="4xl" textTransform="uppercase">{isError ? 'Hoppá!' : 'Gratulálunk'}</Heading>
      <Text fontSize="xl" maxWidth="15em" textAlign="center">{statusText}</Text>
    </VStack>
  );
};

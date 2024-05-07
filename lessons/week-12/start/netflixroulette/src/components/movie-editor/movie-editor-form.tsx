import { CalendarIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { GenreSelector } from './genre-selector';
import { Movie } from '../../models';

const numberInputStyle = {
  backgroundColor: "interactive.input.background.default",
  borderColor: "transparent",
  _hover: {
    borderColor: 'background.medium'
  },
};

export interface MovieEditorFormProps {
  movie: Movie | null;
  onCancel: () => void;
  onSubmit: (movie: Movie) => Promise<Movie>;
}

export const MovieEditorForm: FC<MovieEditorFormProps> = () => {
  return (
    <VStack as="form" spacing="8">
      <Flex gap="8" width="full">
        <FormControl>
          <FormLabel>Film címe</FormLabel>
          <Input />
        </FormControl>
        <FormControl flexBasis="35%" flexShrink={0}>
          <FormLabel>Kiadás ideje</FormLabel>
          <InputGroup>
            <Input type="date" placeholder="Select date" />
            <InputRightElement>
              <CalendarIcon color="text.highlighted" />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Flex>

      <Flex gap="8" width="full">
        <FormControl>
          <FormLabel>Poszter</FormLabel>
          <Input type="url" placeholder="https://" />
        </FormControl>
        <FormControl flexBasis="35%" flexShrink={0}>
          <FormLabel>Értékelés</FormLabel>
          <NumberInput min={0} max={10} precision={1} step={0.1}>
            <NumberInputField placeholder="" sx={numberInputStyle} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Flex>

      <Flex gap="8" width="full">
        <FormControl>
          <FormLabel>Típus</FormLabel>
          <GenreSelector />
        </FormControl>
        <FormControl flexBasis="35%" flexShrink={0}>
          <FormLabel>Hossz</FormLabel>
          <NumberInput min={0}>
            <NumberInputField placeholder="perc" sx={numberInputStyle} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Flex>

      <FormControl>
        <FormLabel>Összegzés</FormLabel>
        <Textarea placeholder="Movie description" resize="none" rows={8} />
      </FormControl>

      <ButtonGroup width="full" justifyContent="flex-end" gap={3} paddingTop={8}>
        <Button type="reset" variant="secondary" size="lg">Mégsem</Button>
        <Button type="submit" size="lg">Mentés</Button>
      </ButtonGroup>
    </VStack>
  );
}
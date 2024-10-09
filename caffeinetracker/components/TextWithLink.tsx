import React from 'react';
import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';

type TextWithLinkProps = {
    text: string;
    linkText: string;
    onPress: () => void;
};

const TextWithLink: React.FC<TextWithLinkProps> = ({ text, linkText, onPress }) => (
    <Box alignItems="center" marginTop="$3">
        <Text textAlign="center">{text}</Text>
        <Button variant="link" onPress={onPress} marginTop="$1">
            <ButtonText color="$blue600">{linkText}</ButtonText>
        </Button>
    </Box>
);

export default TextWithLink;
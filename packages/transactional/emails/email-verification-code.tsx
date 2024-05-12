'use client';

import {
  Container,
  Head,
  Heading,
  Html,
  Section,
  Tailwind,
} from '@react-email/components';

import { config } from '../tailwind.config';

export function EmailVerificationCode() {
  return (
    <Tailwind config={config}>
      <Html
        lang="en"
        dir="ltr"
        className="font-sans bg-background text-foreground"
      >
        <Head />
        <Section>
          <Container>
            <Heading>Hello World</Heading>
          </Container>
        </Section>
      </Html>
    </Tailwind>
  );
}

export default EmailVerificationCode;

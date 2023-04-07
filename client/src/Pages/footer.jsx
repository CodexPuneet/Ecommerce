import {
    Box,
    chakra,
    Container,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
  } from '@chakra-ui/react';
  import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
  
  
  const Logo = () => {
    return (
      <Box>
     <Image src="https://impresariopromotions.com/wp-content/uploads/elementor/thumbs/IMPRESARIO-GOOD-logo-oqeu7t8iqzn0fnelxp1gvenld0wpxy6m7ab0sarvq8.png"/>
     <Text fontWeight={'bold'} >IMPRESARIO PROMOTIONS</Text>
      </Box>

    );
  };
  
  const SocialButton = ({
    children,
    label,
    href,
  }) => {
    return (
      <chakra.button
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        rounded={'full'}
        w={8}
        h={8}
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };
  
  export default function SmallCentered() {
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          spacing={4}
          justify={'center'}
          align={'center'}>
          <Logo />
          <Stack direction={'row'} spacing={6}>
            <Link href={'#'}>Email
inquiry@impresariopromotions.com</Link>
            <Link href={'#'}>Noida
C-14, Sector 6, Noida, Uttar Pradesh, 201301</Link>
            <Link href={'#'}>KamOn Building 176A,</Link>
            <Link href={'#'}>Contact</Link>
          </Stack>
        </Container>
  
        <Box
          borderTopWidth={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}>
          <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ base: 'center', md: 'space-between' }}
            align={{ base: 'center', md: 'center' }}>
            <Text>© 2020   Made with love & coffee</Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Facebook'} href={'https://www.facebook.com/impresariopromotion/'}>
                <FaFacebook />
              </SocialButton>
              <SocialButton label={'LinkedIn'} href={'https://www.linkedin.com/company/impresario-promotech/'}>
                <FaLinkedin />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'https://www.instagram.com/impresario_promotions/'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Container>
        </Box>
      </Box>
    )
  }
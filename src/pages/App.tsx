import * as React from "react";
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Card,
  CardHeader,
  CardBody,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  NumberInput,
  NumberInputField,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Tooltip,
  Flex,
  Center,
  VStack,
  Button,
  VisuallyHidden,
  CheckboxIcon,
  Icon,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./../components/ColorModeSwitcher";
import { Logo } from "./../components/Logo";

export const App = () => {
  //input state
  const [inputValue, setInputValue] = React.useState(1500000);

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

  //slider state
  const [minValue, setMinValue] = React.useState(0);
  const [maxValue, setMaxValue] = React.useState(1500);

  const handleMinChange = (value: number) => {
    setMinValue(value);
  };

  const handleMaxChange = (value: number) => {
    setMaxValue(value);
  };

  
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Flex
            width={"70%"}
            height={"400px"}
            display={"flex"}
            justifyContent={"center"}
            marginRight={"auto"}
            marginLeft={"auto"}
          >
            <Card
              width="500px"
              height={"400px"}
              display={"flex"}
              justifyContent={"center"}
              marginRight={"auto"}
              marginLeft={"0"}
              background={"#181717"}
            >
              <CardHeader
                display={"flex"}
                marginLeft="0.5rem"
                padding={"0.7rem"}
              >
                <Text>Liquidity Deposit Value</Text>
              </CardHeader>
              <CardBody>
                <Stat>
                  <StatLabel>Value of paired tokens</StatLabel>
                  <StatNumber
                    maxWidth={"50%"}
                    marginRight="auto"
                    marginLeft="auto"
                    padding="0.5rem"
                    border="0px"
                  >
                    <NumberInput
                      defaultValue={inputValue}
                      border="none"
                      focusBorderColor="none"
                      size="lg"
                    >
                      <NumberInputField
                        display="flex"
                        border="none"
                        marginLeft="1rem"
                        w="100%"
                        onChange={(event) =>
                          handleInputChange(Number(event.target.value))
                        }
                      />
                    </NumberInput>
                  </StatNumber>
                </Stat>
                <Text marginTop="0.5rem">Select ETH price range</Text>
                <Box>
                  <RangeSlider
                    min={0}
                    max={4000}
                    aria-label={["min", "max"]}
                    onChange={([newMinValue, newMaxValue]) => {
                      handleMinChange(newMinValue);
                      handleMaxChange(newMaxValue);
                    }}
                    value={[minValue, maxValue]}
                    aria-valuetext={["10,30"]}
                    marginTop="1rem"
                    w="70%"
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb
                      index={0}
                      children={
                        <Tooltip isOpen={true} label={`${minValue}$`}>
                          .
                        </Tooltip>
                      }
                    />
                    <RangeSliderThumb
                      index={1}
                      children={
                        <Tooltip isOpen={true} label={`${maxValue}$`}>
                          <Text>.</Text>
                        </Tooltip>
                      }
                    />
                  </RangeSlider>
                </Box>
                <Text marginTop="3rem" fontSize="sm">
                  Current price: $2,000
                </Text>
              </CardBody>
            </Card>

            <Card
              width={"100%"}
              height={"400px"}
              display={"flex"}
              justifyContent={"center"}
              marginRight={"auto"}
              marginLeft={"0"}
              background={"#2c2a2a"}
            >
              <CardHeader
                display={"flex"}
                marginLeft="0.5rem"
                padding={"0.7rem"}
              >
                <Center gap={"9rem"}>
                  <Center>
                    <Icon
                      viewBox="0 0 200 200"
                      color="green.500"
                      w="1rem"
                      h="1rem"
                    >
                      <path
                        fill="currentColor"
                        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                      />
                    </Icon>
                    <Text marginLeft="1rem">V3 position</Text>
                  </Center>

                  <Text>V2 position</Text>
                </Center>
              </CardHeader>
              <CardBody>
                <Center gap="8rem" justifyContent={"left"} marginLeft="1rem">
                  <VStack>
                    <Stat>
                      <StatLabel fontSize="md">Capital required</StatLabel>
                      <StatNumber
                        maxWidth={"50%"}
                        marginRight="auto"
                        marginLeft="auto"
                        padding="0.5rem"
                        border="0px"
                      >
                        0
                      </StatNumber>
                    </Stat>
                  </VStack>
                  <VStack>
                    <Stat>
                      <StatLabel fontSize="md">Capital required</StatLabel>
                      <StatNumber
                        maxWidth={"50%"}
                        marginRight="auto"
                        marginLeft="auto"
                        padding="0.5rem"
                        border="0px"
                      >
                        0
                      </StatNumber>
                    </Stat>
                  </VStack>
                </Center>

                <Center
                  justifyContent={"left"}
                  marginLeft="1rem"
                  marginTop="3rem"
                >
                  <VStack>
                    <Stat>
                      <StatLabel fontSize="md">Fees per $ vs. V2</StatLabel>
                      <StatNumber
                        maxWidth={"50%"}
                        marginRight="auto"
                        marginLeft="auto"
                        padding="0.5rem"
                        border="0px"
                      >
                        <Flex>2.3x</Flex>
                      </StatNumber>
                    </Stat>
                    <Text fontSize="md">
                      These two positions will earn equal fees and perform
                      idenitcally while the price remains between ${minValue}{" "}
                      and ${maxValue}.
                    </Text>
                  </VStack>
                </Center>
              </CardBody>
            </Card>
          </Flex>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

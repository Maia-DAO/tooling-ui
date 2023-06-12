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
  HStack,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./../components/ColorModeSwitcher";
import { Logo } from "./../components/Logo";
import {
  FEE_TO_TICK_SPACING,
  MAX_TICK,
  MIN_TICK,
  positionEfficiency,
  tickToPrices,
} from "../utils";

export const App = () => {
  //input state
  const [inputValue, setInputValue] = React.useState(1500000);

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

  const feeTier = 100;
  const tickSpacing = FEE_TO_TICK_SPACING[feeTier];

  const [minimum, setMinimum] = React.useState(
    MIN_TICK - (MIN_TICK % tickSpacing)
  );
  const [maximum, setMaximum] = React.useState(
    MAX_TICK - (MAX_TICK % tickSpacing)
  );

  //slider state
  const [minValue, setMinValue] = React.useState(minimum);
  const [maxValue, setMaxValue] = React.useState(maximum);

  const handleMinimum = (value: number) => {
    setMinimum(value);
    if (minValue < value) setMinValue(value);
  };

  const handleMaximum = (value: number) => {
    setMaximum(value);
    if (maxValue > value) setMaxValue(value);
  };

  const handleMinChange = (value: number) => {
    setMinValue(value);
  };

  const handleMaxChange = (value: number) => {
    setMaxValue(value);
  };

  const efficiency = positionEfficiency(feeTier, maxValue - minValue);
  const lowerPrice = tickToPrices(minValue);
  const upperPrice = tickToPrices(maxValue);

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
                    <HStack spacing={-10}>
                      <Text fontSize='md'>$</Text>
                      <NumberInput
                        defaultValue={inputValue}
                        border="none"
                        focusBorderColor="none"
                        size="lg"
                      >
                        <NumberInputField
                          display="flex"
                          border="none"
                          w="150%"
                          onChange={(event) =>
                            handleInputChange(Number(event.target.value))
                          }
                        />
                      </NumberInput>
                    </HStack>
                  </StatNumber>
                </Stat>
                <Text marginTop="0.5rem">Select ETH price range</Text>
                <Box>
                  <HStack spacing={6}>
                    <NumberInput
                      defaultValue={minimum}
                      border="none"
                      focusBorderColor="none"
                      size="lg"
                    >
                      <Text>Min Tick</Text>
                      <NumberInputField
                        display="flex"
                        border="none"
                        marginLeft="1rem"
                        w="100%"
                        onChange={(event) =>
                          handleMinimum(Number(event.target.value))
                        }
                      />
                    </NumberInput>
                    <NumberInput
                      defaultValue={maximum}
                      border="none"
                      focusBorderColor="none"
                      size="lg"
                    >
                      <Text>Max Tick</Text>
                      <NumberInputField
                        display="flex"
                        border="none"
                        marginLeft="1rem"
                        w="100%"
                        onChange={(event) =>
                          handleMaximum(Number(event.target.value))
                        }
                      />
                    </NumberInput>
                  </HStack>
                  <RangeSlider
                    min={minimum}
                    max={maximum}
                    aria-label={["min", "max"]}
                    onChange={([newMinValue, newMaxValue]) => {
                      handleMinChange(newMinValue);
                      handleMaxChange(newMaxValue);
                    }}
                    value={[minValue, maxValue]}
                    aria-valuetext={["10,30"]}
                    marginTop="1rem"
                    w="70%"
                    step={tickSpacing}
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb
                      index={0}
                      children={
                        <Tooltip
                          placement="bottom-end"
                          isOpen={true}
                          label={`$${lowerPrice.toPrecision(5)}`}
                        >
                          |
                        </Tooltip>
                      }
                    />
                    <RangeSliderThumb
                      index={1}
                      children={
                        <Tooltip
                          placement="bottom-start"
                          isOpen={true}
                          label={`$${upperPrice.toPrecision(5)}`}
                        >
                          |
                        </Tooltip>
                      }
                    />
                  </RangeSlider>
                </Box>
                <Text marginTop="3rem" fontSize="sm">
                  Current price: $2,000
                </Text>
                <Text fontSize="sm">
                  Fee Tier: {feeTier / 10000}%
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
                      color="green"
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
                        {/* <Text>{inputValue}$</Text> */}
                      </StatNumber>
                    </Stat>
                    <Text color="green">${inputValue.toFixed(0)}</Text>
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
                        {/* <Text>{(inputValue * efficiency).toFixed(0)}$</Text> */}
                      </StatNumber>
                      <Text>${(inputValue * efficiency).toFixed(0)}</Text>
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
                        <Flex>{efficiency.toFixed(2)}x</Flex>
                      </StatNumber>
                    </Stat>
                    <Text fontSize="md">
                      These two positions will earn equal fees and perform
                      idenitcally while the price remains between ${lowerPrice.toPrecision(4)}{" "}
                      and ${upperPrice.toPrecision(4)}.
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

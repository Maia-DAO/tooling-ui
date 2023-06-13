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
  SliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  AbsoluteCenter,
  SliderMark,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./../components/ColorModeSwitcher";
import { Logo } from "./../components/Logo";
import {
  FEE_TO_TICK_SPACING,
  FeeAmount,
  MAX_TICK,
  MIN_TICK,
  incentiveEfficiency,
  tickToPrices,
} from "../utils";
import { formatUSD } from "../utils/number";
import { improvementRatio } from "../utils/sammHelper";

interface CapitalEfficiencyCardProps {
  feeTier: FeeAmount;
}

export const CapitalEfficiencyCard = (args: CapitalEfficiencyCardProps) => {
  //input state
  const [inputValue, setInputValue] = React.useState(15000);

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

  const feeTier = args.feeTier;
  const tickSpacing = FEE_TO_TICK_SPACING[feeTier];

  const minimum = MIN_TICK - (MIN_TICK % tickSpacing);
  const maximum = MAX_TICK - (MAX_TICK % tickSpacing);

  const [range, setRange] = React.useState(tickSpacing);
  const [currentTick, setCurrentTick] = React.useState(0);

  //slider state
  const [minValue, setMinValue] = React.useState(currentTick - range);
  const [maxValue, setMaxValue] = React.useState(currentTick + range);

  const handleRangeChange = (value: number) => {
    setRange(value);
    setMinValue(currentTick - value);
    setMaxValue(currentTick + value);
  };

  const handleCurrentTickChange = (value: number) => {
    setCurrentTick(value);
    setMinValue(value - range);
    setMaxValue(value + range);
};

  const efficiency = incentiveEfficiency(feeTier, (maxValue - minValue) * 2);
  const lowerPrice = tickToPrices(minValue);
  const upperPrice = tickToPrices(maxValue);
  const currentPrice = tickToPrices(currentTick);
  const deltaPrice = upperPrice - currentPrice;
  const percentageRange = (deltaPrice / currentPrice) * 100;

  const stablePoolImprovement = efficiency / improvementRatio(currentPrice, deltaPrice);

  return (
    <Flex
      width={"70%"}
      height={"500px"}
      display={"flex"}
      justifyContent={"center"}
      marginRight={"auto"}
      marginLeft={"auto"}
    >
      <Card
        width="500px"
        height={"500px"}
        display={"flex"}
        justifyContent={"center"}
        marginRight={"auto"}
        marginLeft={"0"}
        background={"#181717"}
      >
        <CardHeader display={"flex"} marginLeft="0.5rem" padding={"0.7rem"}>
          <Text>Liquidity Renting Cost</Text>
        </CardHeader>
        <CardBody>
          <Stat>
            <StatLabel>Cost of Incentives</StatLabel>
            <StatNumber
              maxWidth={"50%"}
              marginRight="auto"
              marginLeft="auto"
              padding="0.5rem"
              border="0px"
            >
              <HStack spacing={-10}>
                <Text fontSize="md">$</Text>
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
          <Text marginTop="0.5rem">Select minimum price range</Text>
          <Box>
            <Slider
              min={tickSpacing}
              max={MAX_TICK}
              onChange={handleRangeChange}
              value={range}
              aria-valuetext={"10"}
              marginTop="1rem"
              w="70%"
              step={tickSpacing}
            >
              <SliderTrack>
                <SliderFilledTrack bg="pink"/>
              </SliderTrack>
              <SliderThumb
                children={
                  <Tooltip
                    placement="right-end"
                    isOpen={true}
                    label={formatUSD(deltaPrice)}
                  >
                    |
                  </Tooltip>
                }
              />
            </Slider>
            <Center>
              <HStack spacing={6}>
                <VStack>
                  <Text>Ticks</Text>
                  <Text>{range}</Text>
                </VStack>
                <VStack>
                  <Text>Price %</Text>
                  <Text>±{percentageRange.toPrecision(4)}%</Text>
                </VStack>
              </HStack>
            </Center>
            <RangeSlider
              min={minimum}
              max={maximum}
              aria-label={["min", "max"]}
              value={[minValue, maxValue]}
              minStepsBetweenThumbs={tickSpacing}
              aria-valuetext={["10,30"]}
              marginTop="1rem"
              w="70%"
              step={tickSpacing}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack bg="pink"/>
              </RangeSliderTrack>
              <RangeSliderThumb
                index={0}
                children={
                  <Tooltip
                    placement="bottom-end"
                    isOpen={true}
                    label={formatUSD(lowerPrice)}
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
                    label={formatUSD(upperPrice)}
                  >
                    |
                  </Tooltip>
                }
              />
            </RangeSlider>
          </Box>
          <Slider
            min={MIN_TICK}
            max={MAX_TICK}
            onChange={handleCurrentTickChange}
            value={currentTick}
            aria-valuetext={"10"}
            marginTop="3rem"
            w="70%"
            step={tickSpacing}
          >
            <SliderTrack>
              <SliderFilledTrack bg="purple" />
            </SliderTrack>
            <SliderThumb
                children={
                  <Tooltip
                    placement="right-end"
                    isOpen={true}
                  >
                    |
                  </Tooltip>
                }
              />
          </Slider>
          <Text fontSize="sm">Current price: {formatUSD(currentPrice)}</Text>
          <Text fontSize="sm">Fee Tier: {feeTier / 10000}%</Text>
        </CardBody>
      </Card>
      <Card
        width={"100%"}
        height={"500px"}
        display={"flex"}
        justifyContent={"center"}
        marginRight={"auto"}
        marginLeft={"0"}
        background={"#2c2a2a"}
      >
        <CardHeader display={"flex"} marginLeft="0.5rem" padding={"0.7rem"}>
          <Center gap={"9rem"}>
            <Center>
              <Icon viewBox="0 0 200 200" color="green" w="1rem" h="1rem">
                <path
                  fill="currentColor"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                />
              </Icon>
              <Text marginLeft="1rem">V3 incentive</Text>
            </Center>

            <Text>V2 incentive</Text>
            <Text>sAMM incentive</Text>
          </Center>
        </CardHeader>
        <CardBody>
          <Center gap="8rem" justifyContent={"left"} marginLeft="1rem">
            <VStack>
              <Stat>
                <StatLabel fontSize="md">Capital required</StatLabel>
                <Text color="green">{formatUSD(inputValue)}</Text>
              </Stat>
            </VStack>
            <VStack>
              <Stat>
                <StatLabel fontSize="md">Capital required</StatLabel>
                <Text>{formatUSD(inputValue * efficiency)}</Text>
              </Stat>
            </VStack>
            <VStack>
              <Stat>
                <StatLabel fontSize="md">Capital required</StatLabel>
                <Text>{formatUSD(inputValue * stablePoolImprovement)}</Text>
              </Stat>
            </VStack>
          </Center>

          <Center justifyContent={"left"} marginLeft="1rem" marginTop="3rem">
            <VStack>
              <Stat>
                <StatLabel fontSize="md">Liquidity per $ vs. V2</StatLabel>
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
              <Stat>
                <StatLabel fontSize="md">Liquidity per $ vs. sAMM</StatLabel>
                <StatNumber
                  maxWidth={"50%"}
                  marginRight="auto"
                  marginLeft="auto"
                  padding="0.5rem"
                  border="0px"
                >
                  <Flex>{stablePoolImprovement.toFixed(2)}x</Flex>
                </StatNumber>
              </Stat>
              <Text fontSize="md">
                These three incentives will rent identically the same useful
                liquidity in {percentageRange.toPrecision(4)}% price range (
                {range} {range === 1 ? "Tick" : "Ticks"}).
              </Text>
            </VStack>
          </Center>
        </CardBody>
      </Card>
    </Flex>
  );
};

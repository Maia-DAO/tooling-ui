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
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import {
  FEE_TO_TICK_SPACING,
  FeeAmount,
  MAX_TICK,
  MIN_TICK,
  tickToPrices,
  formatUSD,
} from "../utils";

interface EfficiencyCardProps {
  feeTier: FeeAmount;
  name: string;
  incentiveEfficiency: (
    feeTier: number,
    minWidth: number,
    currentPrice: number,
    priceUpper: number
  ) => number;
}

export const EfficiencyCard = (args: EfficiencyCardProps) => {
  //input state
  const [inputValue, setInputValue] = React.useState(15000);

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

  const feeTier = args.feeTier;
  const tickSpacing = FEE_TO_TICK_SPACING[feeTier];

  const minimum = MIN_TICK / 10 - ((MIN_TICK / 10) % tickSpacing);
  const maximum = MAX_TICK / 10 - ((MAX_TICK / 10) % tickSpacing);

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

  const lowerPrice = tickToPrices(minValue);
  const upperPrice = tickToPrices(maxValue);
  const currentPrice = tickToPrices(currentTick);
  const deltaPrice = upperPrice - currentPrice;
  const percentageRange = (deltaPrice / currentPrice) * 100;

  const efficiency = args.incentiveEfficiency(
    feeTier,
    (maxValue - minValue) * 2,
    currentPrice,
    deltaPrice
  );

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
        borderRadius={"0"}
        borderLeftRadius={"2rem"}
        width="500px"
        height={"450px"}
        display={"flex"}
        justifyContent={"center"}
        marginRight={"auto"}
        marginLeft={"0"}
        background={"#323232"}
      >
        <CardHeader display={"flex"} marginLeft="0.5rem" padding={"0.7rem"}>
          <Text>Liquidity Renting Cost</Text>
        </CardHeader>
        <CardBody>
          <Stat>
            <StatLabel>
              <Text align="left">Value of Incentives</Text>
            </StatLabel>
            <StatNumber
              maxWidth={"50%"}
              maxHeight={"50px"}
              marginRight="auto"
              padding="0.5rem"
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
                    w="100%"
                    onChange={(event) =>
                      handleInputChange(Number(event.target.value))
                    }
                  />
                </NumberInput>
              </HStack>
            </StatNumber>
          </Stat>
          <Text align="left" marginTop="0.5rem">
            Select minimum price range
          </Text>
          <Box>
            <Slider
              min={tickSpacing}
              max={maximum}
              onChange={handleRangeChange}
              value={range}
              aria-valuetext={"10"}
              marginTop="1rem"
              w="100%"
              step={tickSpacing}
            >
              <SliderTrack>
                <SliderFilledTrack bg="#ff007a" />
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
                  <Text>±{percentageRange.toFixed(4)}%</Text>
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
              w="100%"
              step={tickSpacing}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack bg="#ff007a" />
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
            min={minimum}
            max={maximum}
            onChange={handleCurrentTickChange}
            value={currentTick}
            aria-valuetext={"10"}
            marginTop="3rem"
            w="100%"
            step={tickSpacing}
          >
            <SliderTrack>
              <SliderFilledTrack bg="" />
            </SliderTrack>
            <SliderThumb
              children={
                <Tooltip placement="right-end" isOpen={true}>
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
        borderRadius={"0"}
        borderRightRadius={"2rem"}
        width={"100%"}
        height={"450px"}
        display={"flex"}
        justifyContent={"center"}
        marginRight={"auto"}
        marginLeft={"0"}
        background={"#000000"}
      >
        <CardHeader
          display={"flex"}
          marginLeft="0.5rem"
          padding={"0.7rem"}
        ></CardHeader>
        <CardBody>
          <HStack gap="4rem" justifyContent={"left"}>
            <VStack align={"left"}>
              <Center>
                <Icon
                  viewBox="0 0 200 200"
                  color="green"
                  w="1rem"
                  h="1rem"
                  marginRight="-2"
                >
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                <Text marginLeft="1rem">V3 incentive</Text>
              </Center>

              <Stat>
                <StatLabel fontSize="md">
                  <Text align="left">Cost</Text>
                </StatLabel>
                <Text align="left" color="green">
                  {formatUSD(inputValue / efficiency)}
                </Text>
              </Stat>
            </VStack>
            <VStack align={"left"}>
              <Center>
                <Icon
                  viewBox="0 0 200 200"
                  color="grey"
                  w="1rem"
                  h="1rem"
                  marginRight="-2"
                >
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                <Text marginLeft="1rem">{args.name} incentive</Text>
              </Center>
              <Stat>
                <StatLabel fontSize="md">
                  <Text align="left">Cost</Text>
                </StatLabel>
                <Text align="left">{formatUSD(inputValue)}</Text>
              </Stat>
            </VStack>
          </HStack>

          <VStack marginTop="1rem" align="left">
            <Stat>
              <StatLabel fontSize="md">
                <Text align="left">Depth per $ vs. {args.name}</Text>
              </StatLabel>
              <StatNumber
              // maxWidth={"50%"}
              // marginRight="auto"
              // marginLeft="auto"
              // padding="0.5rem"
              // border="0px"
              >
                <Flex>{efficiency.toFixed(2)}x</Flex>
              </StatNumber>
            </Stat>
            <Text marginTop="1rem" fontSize="md" align="left">
              These two incentives will rent identical amounts of useful
              liquidity, while the rewards are distributed to positions held in
              the exact same active trading ranges. This applies to position
              ranges larger than {percentageRange.toPrecision(4)}% ({range}{" "}
              {range === 1 ? "Tick" : "Ticks"}).{" "}
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  );
};

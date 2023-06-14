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
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  TabList,
  TabIndicator,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./../components/ColorModeSwitcher";
import { Logo } from "./../components/Logo";
import {
  FEE_TO_TICK_SPACING,
  FeeAmount,
  MAX_TICK,
  MIN_TICK,
  incentiveEfficiencyVsUniswapV2,
  tickToPrices,
  formatUSD,
  incentiveEfficiencyVssAMM,
} from "../utils";
import { EfficiencyCard } from "./EfficiencyCard";

interface CapitalEfficiencyCardProps {
  feeTier: FeeAmount;
}

export const CapitalEfficiencyCard = (args: CapitalEfficiencyCardProps) => {
  return (
    <Tabs isFitted isLazy defaultIndex={0}>
      <TabList
        width={"65%"}
        display={"flex"}
        justifyContent={"center"}
        marginRight={"auto"}
        marginLeft={"auto"}
      >
        <Tab
          _selected={{
            color: "#ff007a",
            borderColor: "#ff007a",
          }}
        >
          Uniswap V2
        </Tab>
        <Tab
          _selected={{
            color: "#ff007a",
            borderColor: "#ff007a",
          }}
        >
          Stable AMM
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <EfficiencyCard
            feeTier={args.feeTier}
            name={"Uni V2"}
            incentiveEfficiency={incentiveEfficiencyVsUniswapV2}
          ></EfficiencyCard>
        </TabPanel>
        <TabPanel>
          <EfficiencyCard
            feeTier={args.feeTier}
            name={"sAMM"}
            incentiveEfficiency={incentiveEfficiencyVssAMM}
          ></EfficiencyCard>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

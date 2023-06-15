import * as React from "react";
import {
  ChakraProvider,
  Box,
  Grid,
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./../components/ColorModeSwitcher";
import { Logo } from "./../components/Logo";
import {
  FEE_TO_TICK_SPACING,
  FeeAmount,
  MAX_TICK,
  MIN_TICK,
  tickToPrices,
  theme,
  formatUSD,
} from "../utils";
import { CapitalEfficiencyCard } from "../components/CapitalEfficiencyCard";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="#191b1f" height="100vh">
        <CapitalEfficiencyCard></CapitalEfficiencyCard>
      </Box>
    </ChakraProvider>
  );
};

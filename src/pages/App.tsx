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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
import { CapitalEfficiencyCard } from "../components/CapitalEfficiencyCard";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Tabs isFitted isLazy defaultIndex={1}>
            <TabList
              width={"65%"}
              display={"flex"}
              justifyContent={"center"}
              marginRight={"auto"}
              marginLeft={"auto"}
            >
              <Tab>0.01%</Tab>
              <Tab>0.05%</Tab>
              <Tab>0.30%</Tab>
              <Tab>1.00%</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <CapitalEfficiencyCard
                  feeTier={FeeAmount.LOWEST}
                ></CapitalEfficiencyCard>
              </TabPanel>
              <TabPanel>
                <CapitalEfficiencyCard
                  feeTier={FeeAmount.LOW}
                ></CapitalEfficiencyCard>
              </TabPanel>
              <TabPanel>
                <CapitalEfficiencyCard
                  feeTier={FeeAmount.MEDIUM}
                ></CapitalEfficiencyCard>
              </TabPanel>
              <TabPanel>
                <CapitalEfficiencyCard
                  feeTier={FeeAmount.HIGH}
                ></CapitalEfficiencyCard>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

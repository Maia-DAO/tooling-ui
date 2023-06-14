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
      <Box textAlign="center" fontSize="xl" bg="#191b1f">
        <Grid minH="100vh" p={3}>
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
                0.01%
              </Tab>
              <Tab
                _selected={{
                  color: "#ff007a",
                  borderColor: "#ff007a",
                }}
              >
                0.05%
              </Tab>
              <Tab
                _selected={{
                  color: "#ff007a",
                  borderColor: "#ff007a",
                }}
              >
                0.30%
              </Tab>
              <Tab
                _selected={{
                  color: "#ff007a",
                  borderColor: "#ff007a",
                }}
              >
                1.00%
              </Tab>
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

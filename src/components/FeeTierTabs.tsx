import { Box, Center, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import { FEES_STRING, FEE_STRING_TO_FEE_AMOUNT, FeeAmount } from "../utils";

function FeeTierTabs(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderBottom="1px"
        width="200px"
        color={
          FEE_STRING_TO_FEE_AMOUNT[props.children[0]] === props.children[1]
            ? "#ff007a"
            : "#ffffff"
        }
        borderColor={
          FEE_STRING_TO_FEE_AMOUNT[props.children[0]] === props.children[1]
            ? "#ff007a"
            : "#ffffff"
        }
        _hover={{ borderColor: "#ff007a" }}
        px={5}
        py={3}
      >
        {props.children[0]}
      </Box>
    </Box>
  );
}

export function useFeeTierTabs(
  feeTier: FeeAmount,
  setFeeTier: (value: number) => void
) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: (value) => setFeeTier(FEE_STRING_TO_FEE_AMOUNT[value]),
  });

  const group = getRootProps();

  return (
    <HStack {...group} justifyContent={"space-evenly"} width="100%">
      {FEES_STRING.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <FeeTierTabs key={value} {...radio}>
            {value}
            {feeTier}
          </FeeTierTabs>
        );
      })}
    </HStack>
  );
}

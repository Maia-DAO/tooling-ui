import {
  Box,
  Center,
  HStack,
  UseRadioProps,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";

function AMMTabs(props: any) {
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
        width="400px"
        color={
          props.children[1] === (props.children[0] === "true")
            ? "#ff007a"
            : "#ffffff"
        }
        borderColor={
          props.children[1] === (props.children[0] === "true")
            ? "#ff007a"
            : "#ffffff"
        }
        _hover={{ borderColor: "#ff007a" }}
        px={5}
        py={3}
      >
        {props.children[0] === "true" ? "Stable AMM" : "Uniswap V2"}
      </Box>
    </Box>
  );
}

export function useAMMTabs(
  isStable: boolean,
  setIsStable: (value: boolean) => void
) {
  const isStableArray = ["false", "true"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: (value) => setIsStable(value === "true"),
  });

  const group = getRootProps();

  return (
    <HStack {...group} justifyContent={"space-evenly"} width="100%">
      {isStableArray.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <AMMTabs key={value} {...radio}>
            {value}
            {isStable}
          </AMMTabs>
        );
      })}
    </HStack>
  );
}

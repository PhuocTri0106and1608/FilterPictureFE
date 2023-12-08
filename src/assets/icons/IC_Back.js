import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path stroke="#744ACC" d="m9.612 19-6.717-7 6.717-7M3.267 11.891H21" />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo

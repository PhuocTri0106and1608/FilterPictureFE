import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { memo } from "react"

const SvgComponent = (props) => (
  <Svg
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={28} height={28} rx={14} fill="#F8F8F8" />
    <Path
      d="m8.75 8.043-.707.707.355.352L13.293 14l-5.25 5.25.707.707 5.25-5.25 4.895 4.898.355.352.707-.707-.352-.355L14.707 14l5.25-5.25-.707-.707-5.25 5.25-4.898-4.895-.352-.355Z"
      fill="#555"
    />
  </Svg>
)

const Memo = memo(SvgComponent)
export default Memo

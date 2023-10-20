import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={16}
    fill={props.stroke||"#fff"}
    {...props}
  >
    <Path
      //fill="#D6D6D6"
      d="M.293 7.293a1 1 0 0 0 0 1.414l6.364 6.364a1 1 0 0 0 1.414-1.414L2.414 8l5.657-5.657A1 1 0 0 0 6.657.93L.293 7.293ZM1 9h22V7H1v2Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo

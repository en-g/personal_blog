import {
  Container,
  Header,
  Main,
  Footer,
  Menu,
  MenuItem,
  Avatar,
  Input,
  Tooltip,
  Card,
  Tag,
  Button,
  Badge,
  Link,
  Timeline,
  TimelineItem,
  Image,
  Popover,
  Upload,
  Message,
  Dialog,
  Form,
  FormItem,
  RadioGroup,
  RadioButton,
  CheckboxGroup,
  CheckboxButton,
  Checkbox,
  Collapse,
  CollapseItem,
  Select,
  Option,
  Backtop
} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import 'element-ui/lib/theme-chalk/base.css'

const elements = [
  Container,
  Header,
  Main,
  Footer,
  Menu,
  MenuItem,
  Avatar,
  Input,
  CollapseTransition,
  Tooltip,
  Card,
  Tag,
  Button,
  Badge,
  Link,
  Timeline,
  TimelineItem,
  Image,
  Popover,
  Upload,
  Dialog,
  Form,
  FormItem,
  RadioGroup,
  RadioButton,
  CheckboxGroup,
  CheckboxButton,
  Checkbox,
  Collapse,
  CollapseItem,
  Select,
  Option,
  Backtop
]

export default function (Vue) {
  for (let element of elements) {
    Vue.use(element)
  }
  Vue.prototype.$message = Message
}

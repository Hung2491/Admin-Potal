// import { useState } from "react";
// import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import type { AddDocument } from "../types/AuthType";
// const typeOptions: DocumentType[] = ["markdown", "html", "text"];

// export function SelectType({ data }: { data: AddDocument }) {
//   const [type, setType] = useState<AddDocument>(data.type);

//   return (
//     <FormControl fullWidth size="small">
//       <InputLabel id="type-label">Type</InputLabel>

//       <Select
//         labelId="type-label"
//         label="Type"
//         value={type}
//         onChange={(e) => setType(e.target.value as AddDocument)}
//       >
//         {typeOptions.map((item) => (
//           <MenuItem key={item} value={item}>
//             {item.toUpperCase()}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }

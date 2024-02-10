import React, { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const CreateChatTabItem: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const debounceValue = useDebounce(searchInput);

  return <div>sda</div>;
};

export default CreateChatTabItem;

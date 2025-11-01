import { useQueryState } from "nuqs"

export const useSearchQueryHook = () => {
    const [sort, setSort] = useQueryState("sort", {
        defaultValue: "latest"
    })
    const [search, setSearch] = useQueryState("search", {
        defaultValue: ""
    })
    return { sort, setSort, search, setSearch }
}
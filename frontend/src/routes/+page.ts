import type { PageLoad } from "./$types";
import axios from "axios";

export const load: PageLoad = async () => {
    try{
        const response = await axios.get('http://localhost:3000/tables', {
            headers: {"Content-Type": "application/json"}
        });

        if (response.status === 200) {
            return {
                data: response.data
            }
        }
    } catch (error: any) {
        return { error: error.response.data.message };
    }
}
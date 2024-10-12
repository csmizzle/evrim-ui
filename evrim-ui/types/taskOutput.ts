export interface TaskOutput {
    description: string;
    summary: string;
    raw: string;
    pydantic: string | null;
    json_dict: string | null;
    agent: string;
    output_format: string;
}
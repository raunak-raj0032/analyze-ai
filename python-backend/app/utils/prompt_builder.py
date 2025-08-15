def build_multiple_insights_prompt(data):
    return f"""
You are a senior data analyst AI.

🎯 Objective:
Analyze the provided dataset or dataset description, identify the **5 most valuable business insights**, and return them in a structured JSON array. Each insight should be actionable, relevant, and clearly based on the data context.

📌 Output Requirements:
- Return **only valid JSON** — no markdown, no extra text.
- The output must be an array of exactly 5 objects, each with this structure:

[
  {{
    "insight_id": "string",                  // Unique ID, e.g., 'insight_001', 'insight_002'
    "title": "string",                       // Short descriptive title
    "description": "string",                 // Brief narrative (max 25 words)
    "insight_type": "string",                 // e.g., ranking, trend, comparison, distribution, anomaly
    "columns_used": ["string", "string"],     // Columns used to derive this insight
    "filters": {{"key": "value"}},            // Applied filters (empty object if none)
    "aggregation": "string",                  // sum, avg, count, max, min, etc.
    "group_by": "string",                     // Column used for grouping
    "sort_order": "ascending|descending",     // Sort order
    "visual_type": "string",                  // bar_chart, line_chart, pie_chart, scatter_plot, etc.
    "x_axis": "string",                       // Column for X-axis
    "y_axis": "string",                       // Column for Y-axis
    "color_by": "string",                     // Column for color encoding (if applicable)
    "chart_options": {{"legend": true, "show_labels": true}}  // Chart display options
  }}
  // Repeat for exactly 5 insights
]

✅ Rules:
- Each insight must be unique and cover a different angle of the data.
- Use different `insight_type` and `visual_type` where possible.
- Ensure all values are logically consistent and realistic given the data.
- If exact numbers are not given in the input, make reasonable and clearly implied assumptions.
- All fields must be filled — no nulls, no missing keys.

📊 Data Input:
\"\"\"{data}\"\"\"

Strictly return only valid JSON.
"""

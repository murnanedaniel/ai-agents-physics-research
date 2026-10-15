# The tool loop

A tool-using agent alternates model decisions with actions executed by a harness. Tool results become context for the next decision.

## Working notes

- [TODO: show model → tool call → result → model in about 30 lines.]
- [TODO: demonstrate a tool schema, argument validation and an explicit permission boundary.]
- [TODO: show failure handling, context growth and a stopping condition.]

## Minimal teaching sketch

```text
context = [task, instructions]
while budget_remaining:
    response = model(context)
    if response.is_final:
        return response
    call = validate_tool_call(response)
    check_permissions(call)
    result = execute(call)
    context += [call, result]
```

!!! note "Draft pseudocode"
    [TODO: turn this sketch into a runnable local example with a harmless tool and a failing test case.]

## Before the course

- [TODO: select a compact worked example and its verification artifact.]
- [TODO: rehearse the live walkthrough and prepare a fallback.]

[Back to the deck ↩](../../../?scene=q2-machinery)

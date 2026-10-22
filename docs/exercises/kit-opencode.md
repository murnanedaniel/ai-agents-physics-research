# Use OpenCode with the KIT KI Toolbox

No Claude subscription? KIT's [KI Toolbox](https://ki-toolbox.scc.kit.edu/) gives you open models (DeepSeek, GLM) through your KIT account. [OpenCode](https://opencode.ai/) is a terminal agent like Claude Code that can talk to it. Thanks to Kylian and Christian at KIT for the config.

Time box: about 5 minutes.

## Steps

1. **Install OpenCode.** Follow [opencode.ai](https://opencode.ai/), or on macOS, Linux or WSL:

    ```bash
    curl -fsSL https://opencode.ai/install | bash
    ```

2. **Copy the KIT config** to `~/.config/opencode/opencode.jsonc`. If you already have a file there, back it up first.

    ```bash
    mkdir -p ~/.config/opencode
    curl -fsSL https://etpwww.etp.kit.edu/~kschmidt/kseta-course/opencode.jsonc \
      -o ~/.config/opencode/opencode.jsonc
    ```

    ??? note "The config, if you'd rather paste it"

        ```json
        {
          "$schema": "https://opencode.ai/config.json",
          "providers": {
            "ki-toolbox": {
              "name": "KI Toolbox",
              "package": "aisdk:@ai-sdk/openai-compatible",
              "settings": {
                "baseURL": "https://ki-toolbox.scc.kit.edu/api",
                "env": ["KI_TOOLBOX_API_KEY"]
              },
              "models": {
                "kit.deepseek-v4-flash": {
                  "name": "deepseek v4 flash",
                  "capabilities": {
                    "tools": true,
                    "input": ["text"],
                    "output": ["text"]
                  }
                },
                "kit.glm-5.3": {
                  "name": "glm 5.3",
                  "capabilities": {
                    "tools": true,
                    "input": ["text"],
                    "output": ["text"]
                  }
                }
              }
            }
          },
          "mcp": {
            "servers": {
              "context7": {
                "type": "remote",
                "url": "https://mcp.context7.com/mcp"
              },
              "gh_grep": {
                "type": "remote",
                "url": "https://mcp.grep.app"
              }
            }
          },
          "formatter": true,
          "lsp": true
        }
        ```

3. **Run `opencode`.** If you get an error like `unknown key "providers"`, reload your shell (or open a new terminal) and try again.
4. **Connect.** Inside OpenCode, type `/connect` and pick **KI Toolbox**. It asks for an API key.
5. **Get your key.** Register or log in at [ki-toolbox.scc.kit.edu](https://ki-toolbox.scc.kit.edu/). The key is under **Settings → Account → API Key**, at the bottom of the page. Paste it into OpenCode.
6. **Pick a model**, for example `deepseek v4 flash`.

Done looks like: OpenCode answers a question like "what files are in this folder?" by actually listing them.

## Then

The hands-on exercises are written for Claude Code, but the prompts work in any agent. Where a card says "say *help me pick what to hill-climb*", paste the matching skill file from `skills/` in the course repository instead, then carry on. Expect open models to be slower and to need more nudging than the frontier ones; that is part of what's worth seeing.

[Back to hands-on 1](hands-on-1-hill-climb.md)

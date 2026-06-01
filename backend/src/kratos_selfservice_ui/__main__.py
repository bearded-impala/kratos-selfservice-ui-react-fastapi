import os

import uvicorn

from kratos_selfservice_ui.app import create_app


def main() -> None:
    uvicorn.run(
        create_app(),
        host="0.0.0.0",
        port=int(os.environ.get("PORT", "3000")),
    )


if __name__ == "__main__":
    main()

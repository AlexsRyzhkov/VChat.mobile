from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

DATABASE_URL = "postgresql+asyncpg://admin:admin1234@147.45.107.249:5432/vchat"

engine = create_async_engine(DATABASE_URL)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def get_async_session() -> AsyncSession:
    async with async_session_maker() as session:
        yield session
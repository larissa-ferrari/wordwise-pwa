"""
Admin CMS router — all endpoints require is_admin=True.

Covers:
  - Tropes      GET/POST /admin/tropes, PATCH/DELETE /admin/tropes/{id}
  - Categories  GET/POST /admin/categories, PATCH/DELETE /admin/categories/{id}
  - Authors     GET/POST /admin/authors, PATCH/DELETE /admin/authors/{id}
  - Books       GET /admin/books, PATCH /admin/books/{id}, DELETE /admin/books/{id}
"""
import uuid

from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import select, func

from app.core.deps import AdminUser, DB
from app.models.author import Author
from app.models.book import Book, BookGenre, BookTrope, Trope
from app.models.category import BookCategory
from app.models.category import Category
from app.schemas.author import AuthorCreate, AuthorOut, AuthorUpdate
from app.schemas.book import BookOut, BookSummary
from app.schemas.category import CategoryCreate, CategoryOut, CategoryUpdate
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/admin", tags=["admin"])


# ───────────────────────────────────────── helpers ────────────────────────────

def _author_out(author: Author, db) -> AuthorOut:
    count = db.scalar(select(func.count(Book.id)).where(Book.author_id == author.id)) or 0
    return AuthorOut(
        id=author.id,
        name=author.name,
        bio=author.bio,
        photo_url=author.photo_url,
        birth_year=author.birth_year,
        nationality=author.nationality,
        created_at=author.created_at,
        books_count=count,
    )


def _category_out(cat: Category, db) -> CategoryOut:
    count = db.scalar(
        select(func.count(BookCategory.book_id)).where(BookCategory.category_id == cat.id)
    ) or 0
    return CategoryOut(
        id=cat.id,
        name=cat.name,
        slug=cat.slug,
        description=cat.description,
        created_at=cat.created_at,
        books_count=count,
    )


def _book_out(book: Book) -> BookOut:
    return BookOut(
        id=book.id,
        title=book.title,
        author=book.author,
        series=book.series,
        cover_gradient=book.cover_gradient,
        cover_url=book.cover_url,
        isbn=book.isbn,
        description=book.description,
        pages=book.pages,
        published_year=book.published_year,
        avg_rating=book.avg_rating,
        rating_count=book.rating_count,
        genres=[bg.genre for bg in book.genres],
        tropes=[bt.trope for bt in book.tropes],
        created_at=book.created_at,
    )


# ───────────────────────────────────────── tropes ─────────────────────────────

@router.get("/tropes", response_model=list)
def list_tropes(_admin: AdminUser, db: DB):
    return db.scalars(select(Trope).order_by(Trope.name)).all()


@router.post("/tropes", status_code=201)
def create_trope(body: dict, _admin: AdminUser, db: DB):
    name: str = body.get("name", "").strip()
    slug: str = body.get("slug", "").strip()
    if not name or not slug:
        raise HTTPException(400, "name and slug are required")
    if db.scalar(select(Trope).where(Trope.slug == slug)):
        raise HTTPException(409, "Slug already exists")
    trope = Trope(id=str(uuid.uuid4()), name=name, slug=slug)
    db.add(trope)
    db.commit()
    db.refresh(trope)
    return trope


@router.patch("/tropes/{trope_id}")
def update_trope(trope_id: str, body: dict, _admin: AdminUser, db: DB):
    trope = db.get(Trope, trope_id)
    if not trope:
        raise HTTPException(404, "Trope not found")
    if "name" in body and body["name"]:
        trope.name = body["name"].strip()
    if "slug" in body and body["slug"]:
        new_slug = body["slug"].strip()
        conflict = db.scalar(select(Trope).where(Trope.slug == new_slug, Trope.id != trope_id))
        if conflict:
            raise HTTPException(409, "Slug already in use")
        trope.slug = new_slug
    db.commit()
    db.refresh(trope)
    return trope


@router.delete("/tropes/{trope_id}", status_code=204)
def delete_trope(trope_id: str, _admin: AdminUser, db: DB):
    trope = db.get(Trope, trope_id)
    if not trope:
        raise HTTPException(404, "Trope not found")
    db.delete(trope)
    db.commit()


# ─────────────────────────────────────── categories ───────────────────────────

@router.get("/categories", response_model=list[CategoryOut])
def list_categories(_admin: AdminUser, db: DB):
    cats = db.scalars(select(Category).order_by(Category.name)).all()
    return [_category_out(c, db) for c in cats]


@router.post("/categories", response_model=CategoryOut, status_code=201)
def create_category(body: CategoryCreate, _admin: AdminUser, db: DB):
    if db.scalar(select(Category).where(Category.slug == body.slug)):
        raise HTTPException(409, "Slug already exists")
    if db.scalar(select(Category).where(Category.name == body.name)):
        raise HTTPException(409, "Name already exists")
    cat = Category(id=str(uuid.uuid4()), **body.model_dump())
    db.add(cat)
    db.commit()
    db.refresh(cat)
    return _category_out(cat, db)


@router.patch("/categories/{cat_id}", response_model=CategoryOut)
def update_category(cat_id: str, body: CategoryUpdate, _admin: AdminUser, db: DB):
    cat = db.get(Category, cat_id)
    if not cat:
        raise HTTPException(404, "Category not found")
    for field, value in body.model_dump(exclude_none=True).items():
        setattr(cat, field, value)
    db.commit()
    db.refresh(cat)
    return _category_out(cat, db)


@router.delete("/categories/{cat_id}", status_code=204)
def delete_category(cat_id: str, _admin: AdminUser, db: DB):
    cat = db.get(Category, cat_id)
    if not cat:
        raise HTTPException(404, "Category not found")
    db.delete(cat)
    db.commit()


# ──────────────────────────────────────── authors ─────────────────────────────

@router.get("/authors", response_model=list[AuthorOut])
def list_authors(_admin: AdminUser, db: DB):
    authors = db.scalars(select(Author).order_by(Author.name)).all()
    return [_author_out(a, db) for a in authors]


@router.post("/authors", response_model=AuthorOut, status_code=201)
def create_author(body: AuthorCreate, _admin: AdminUser, db: DB):
    author = Author(id=str(uuid.uuid4()), **body.model_dump())
    db.add(author)
    db.commit()
    db.refresh(author)
    return _author_out(author, db)


@router.patch("/authors/{author_id}", response_model=AuthorOut)
def update_author(author_id: str, body: AuthorUpdate, _admin: AdminUser, db: DB):
    author = db.get(Author, author_id)
    if not author:
        raise HTTPException(404, "Author not found")
    for field, value in body.model_dump(exclude_none=True).items():
        setattr(author, field, value)
    db.commit()
    db.refresh(author)
    return _author_out(author, db)


@router.delete("/authors/{author_id}", status_code=204)
def delete_author(author_id: str, _admin: AdminUser, db: DB):
    author = db.get(Author, author_id)
    if not author:
        raise HTTPException(404, "Author not found")
    db.delete(author)
    db.commit()


# ────────────────────────────────────────── books ─────────────────────────────

@router.get("/books", response_model=PaginatedResponse[BookSummary])
def list_books(
    _admin: AdminUser,
    db: DB,
    q: str | None = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, le=100),
):
    from sqlalchemy import or_
    stmt = select(Book)
    if q:
        stmt = stmt.where(or_(Book.title.ilike(f"%{q}%"), Book.author.ilike(f"%{q}%")))
    total = db.scalar(select(func.count()).select_from(stmt.subquery())) or 0
    books = db.scalars(stmt.order_by(Book.title).offset((page - 1) * page_size).limit(page_size)).all()
    items = [
        BookSummary(
            id=b.id,
            title=b.title,
            author=b.author,
            cover_gradient=b.cover_gradient,
            cover_url=b.cover_url,
            avg_rating=b.avg_rating,
            genres=[bg.genre for bg in b.genres],
        )
        for b in books
    ]
    return PaginatedResponse(items=items, total=total, page=page, page_size=page_size, has_next=(page * page_size < total))


@router.patch("/books/{book_id}", response_model=BookOut)
def update_book(book_id: str, body: dict, _admin: AdminUser, db: DB):
    book = db.get(Book, book_id)
    if not book:
        raise HTTPException(404, "Book not found")

    simple_fields = {"title", "author", "series", "description", "pages", "published_year", "cover_gradient", "cover_url", "isbn"}
    for field in simple_fields:
        if field in body and body[field] is not None:
            setattr(book, field, body[field])

    # Link / unlink author
    if "author_id" in body:
        author_id = body["author_id"]
        if author_id is None:
            book.author_id = None
        else:
            if not db.get(Author, author_id):
                raise HTTPException(404, "Author not found")
            book.author_id = author_id

    # Replace category list
    if "category_ids" in body:
        db.query(BookCategory).filter_by(book_id=book.id).delete()
        for cat_id in (body["category_ids"] or []):
            if db.get(Category, cat_id):
                db.add(BookCategory(book_id=book.id, category_id=cat_id))

    # Replace trope list
    if "trope_ids" in body:
        db.query(BookTrope).filter_by(book_id=book.id).delete()
        for trope_id in (body["trope_ids"] or []):
            if db.get(Trope, trope_id):
                db.add(BookTrope(book_id=book.id, trope_id=trope_id))

    # Replace genres list
    if "genres" in body:
        db.query(BookGenre).filter_by(book_id=book.id).delete()
        seen = set()
        for genre in (body["genres"] or []):
            if genre not in seen:
                db.add(BookGenre(id=str(uuid.uuid4()), book_id=book.id, genre=genre))
                seen.add(genre)

    db.commit()
    db.refresh(book)
    return _book_out(book)


@router.delete("/books/{book_id}", status_code=204)
def delete_book(book_id: str, _admin: AdminUser, db: DB):
    book = db.get(Book, book_id)
    if not book:
        raise HTTPException(404, "Book not found")
    db.delete(book)
    db.commit()

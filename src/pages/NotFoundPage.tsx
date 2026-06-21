import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-6xl font-bold text-teal-500/30" aria-hidden>
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-navy-900">الصفحة غير موجودة</h1>
      <p className="mt-3 leading-8 text-slate-600">
        قد تكون هذه الصفحة من محتوى قديم تم إزالته. يمكنك العودة للرئيسية أو تصفح التخصصات.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/" variant="primary">
          العودة للرئيسية
        </Button>
        <Button to="/services" variant="secondary">
          التخصصات
        </Button>
      </div>
      <Link to="/contact" className="mt-6 text-sm text-teal-600 hover:text-teal-700">
        أو تواصل معنا مباشرة
      </Link>
    </div>
  );
}

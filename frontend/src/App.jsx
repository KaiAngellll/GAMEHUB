
import { useEffect, useMemo, useState } from 'react';
import './App.css';

const news = [
  {
    title: 'Стали известны новые детали геймплея GTA VI',
    image: '/images/новость 1.png',
    intro: 'Испанский блогер El Rubius побывал в Rockstar North, где ему показали около трёх часов игрового процесса GTA VI.',
    fullText: (
      <>
        <p>Испанский блогер El Rubius рассказал о посещении студии Rockstar North, где ему удалось познакомиться с ранней версией долгожданной игры. По его словам, демонстрация продолжалась около трёх часов.</p>
        <h3>Что известно о демонстрации?</h3>
        <p>Показ проводил руководитель разработки Роб Нельсон. Представленная версия игры ещё находится в разработке, поэтому отдельные элементы могут отличаться от финального варианта.</p>
        <p>Поклонники серии ждут подробностей об открытом мире, персонажах, транспорте и возможностях взаимодействия с окружением.</p>
        <h3>Почему это важно?</h3>
        <p>Предварительные показы позволяют получить представление о ходе разработки, однако их не стоит воспринимать как окончательный вариант игры. Пока остаётся ждать официальных материалов Rockstar.</p>
      </>
    ),
  },
  {
    title: 'Релиз 007 First Light на Switch 2 отложили до марта 2027-го',
    image: '/images/новость 2.png',
    intro: 'Изначально 007 First Light для Nintendo Switch 2 должна была стартовать в мае. Теперь новое окно выхода — март 2027 года.',
    fullText: (
      <>
        <p>Выход 007 First Light на Nintendo Switch 2 снова переносится. Изначально игра должна была появиться на платформе одновременно с остальными версиями в мае. Позже разработчики сообщили о переносе на лето, но теперь стало известно о новом сроке — марте 2027 года.</p>
        <h3>Почему перенесли релиз?</h3>
        <p>Команда IO Interactive объясняет решение стремлением обеспечить необходимый уровень качества. Разработчикам требуется дополнительное время, чтобы подготовить версию для консоли и добиться стабильной работы игры.</p>
        <p>Студия поблагодарила игроков за терпение и интерес к проекту. Команда понимает, что поклонники с нетерпением ждут возможности познакомиться с новой историей становления Джеймса Бонда.</p>
        <h3>Что представляет собой 007 First Light?</h3>
        <p>Игра рассказывает о молодом Джеймсе Бонде и его пути к статусу легендарного агента. Игрокам предстоит познакомиться с событиями, которые сформировали будущего шпиона, а также принять участие в опасных заданиях и приключениях.</p>
        <p>Разработчики обещают сохранить атмосферу шпионского приключения: секретные операции, погони, скрытное прохождение и напряжённые столкновения.</p>
      </>
    ),
  },
  {
    title: 'Новые подробности о разработке Starfield и The Elder Scrolls VI',
    image: '/images/новость 3.png',
    intro: 'Игровое сообщество продолжает обсуждать Starfield и долгожданную The Elder Scrolls VI. Поклонники Bethesda ждут новых подробностей.',
    fullText: (
      <>
        <p>Bethesda Game Studios продолжает оставаться в центре внимания игрового сообщества. Игроки активно обсуждают развитие Starfield, а также ждут новых новостей о следующей части серии The Elder Scrolls.</p>
        <h3>Почему Starfield вызывает интерес?</h3>
        <p>Starfield предлагает исследование космоса, путешествия между планетами, выполнение заданий и развитие собственного персонажа. Масштаб игрового мира стал одной из главных особенностей проекта.</p>
        <h3>А что насчёт The Elder Scrolls VI?</h3>
        <p>Следующая часть знаменитой фэнтезийной серии остаётся одним из самых ожидаемых проектов Bethesda. Аудитория надеется увидеть большой открытый мир, интересные задания, новые истории и привычную свободу исследования.</p>
        <p>Подробностей о содержании игры пока недостаточно. Поэтому любые обсуждения возможных механик стоит воспринимать как предположения, а не как подтверждённые сведения от разработчиков.</p>
      </>
    ),
  },
];

const cases = [
  {
    id: 1,
    name: 'Dark Carnival',
    game: 'Dota 2',
    price: 149,
    image: '/images/кейс 1 обложка.png',
    description: 'Представление начинается. Занимайте лучшие места',
    details: 'Добро пожаловать на Dark Carnival — тематический кейс с предметами Dota 2. Внутри собраны косметические предметы с разными стилями оформления.',
  },
  {
    id: 2,
    name: 'Рошан в отпуске',
    game: 'Dota 2',
    price: 199,
    image: '/images/кейс 2 обложка.png',
    description: 'Багаж собран, билеты на руках. В этот раз без Aegis!',
    details: 'Даже Рошану иногда нужен отпуск! В этом кейсе собраны тематические предметы Dota 2. Посмотрите на возможные награды и отправляйтесь в необычное путешествие.',
  },
  {
    id: 3,
    name: 'Янтарный дроп',
    game: 'CS2',
    price: 249,
    image: '/images/кейс 3 обложка.png',
    description: 'Открой свой следующий любимый скин',
    details: 'Янтарный дроп — кейс с подборкой предметов для Counter-Strike 2. Внутри представлены разные модели оружия и варианты оформления.',
  },
];

const dotaItems = [
  ['Autographed Searing Dominator', '/images/items/dota2/autographed searing dominator.png'],
  ['Claszian Apostasy', '/images/items/dota2/claszian apostasy.png'],
  ['Corrupted Golden Draca Maw', '/images/items/dota2/corrupted golden draca maw.png'],
  ['Darkblade Adept', '/images/items/dota2/darkblade adept.png'],
  ['Dread Retribution', '/images/items/dota2/dread retribution.png'],
  ['Genuine Infernal Chieftain', '/images/items/dota2/genuine infernal chieftain.png'],
  ['Golden Origins of Faith', '/images/items/dota2/golden origins of faith.png'],
  ['Golden Silent Wake', '/images/items/dota2/golden silent wake.png'],
  ['Inscribed Garb of the First Ways', '/images/items/dota2/inscribed garb of the first ways.png'],
  ['Shadow of the Dark of the Crimson Witness', '/images/items/dota2/shadow of the dark of the crimson witness.png'],
  ['Voidstorm Asylum', '/images/items/dota2/voidstorm asylum.png'],
].map(([name, image]) => ({ name, image }));

const cs2Items = [
  ['Boreal Forest', '/images/items/cs2/boreal forest.png'],
  ['Crimson Web', '/images/items/cs2/crimson web.png'],
  ['Doppler', '/images/items/cs2/doppler.png'],
  ['Judgement of Anubis', '/images/items/cs2/judgement of anubis.png'],
  ['Occult', '/images/items/cs2/occult.png'],
  ['P90', '/images/items/cs2/P90.png'],
  ['Urban Masked', '/images/items/cs2/urban masked.png'],
  ['Violet Beadwork', '/images/items/cs2/violet beadwork.png'],
  ['Zeus X27', '/images/items/cs2/zeus X27.png'],
].map(([name, image]) => ({ name, image }));

const games = [
  {
    id: 'gta',
    name: 'Grand Theft Auto V',
    price: 189,
    image: '/images/ключи 1 картинка 2.png',
    description: 'Большой открытый мир, истории трёх героев и свобода действий.',
  },
  {
    id: 'resident',
    name: 'Resident Evil 4',
    price: 1599,
    image: '/images/ключи 1 картинка 3.png',
    description: 'Переосмысление культового survival horror.',
  },
  {
    id: 'farcry',
    name: 'Far Cry 6',
    price: 569,
    image: '/images/ключи 1 первая игра.png',
    description: 'Приключение в открытом мире тропического острова.',
  },
  {
    id: 'cyberpunk2077',
    name: 'Cyberpunk 2077',
    price: 799,
    image: '/images/games/cyberpunk-2077.png',
    description: 'Ролевая игра в открытом мире Найт-Сити.',
  },
  {
    id: 'witcher3',
    name: 'The Witcher 3: Wild Hunt',
    price: 499,
    image: '/images/games/witcher-3-wild-hunt.png',
    description: 'Большое фэнтезийное приключение в мире Ведьмака.',
  },
  {
    id: 'rdr2',
    name: 'Red Dead Redemption 2',
    price: 1299,
    image: '/images/games/red-dead-redemption-2.png',
    description: 'История банды вне закона на Диком Западе.',
  },
  {
    id: 'eldenring',
    name: 'Elden Ring',
    price: 2499,
    image: '/images/games/elden-ring.png',
    description: 'Мрачное фэнтези с большим миром и сложными сражениями.',
  },
  {
    id: 'hogwartslegacy',
    name: 'Hogwarts Legacy',
    price: 1799,
    image: '/images/games/hogwarts-legacy.png',
    description: 'Приключение в волшебном мире Хогвартса.',
  },
  {
    id: 'godofwar',
    name: 'God of War',
    price: 1999,
    image: '/images/games/god-of-war.png',
    description: 'Путешествие Кратоса и Атрея по мирам скандинавской мифологии.',
  },
  {
    id: 'detroit',
    name: 'Detroit: Become Human',
    price: 699,
    image: '/images/games/detroit-become-human.png',
    description: 'Интерактивная история об андроидах и человеческом выборе.',
  },
  {
    id: 'assassinscreed',
    name: "Assassin’s Creed Valhalla",
    price: 899,
    image: '/images/games/assassins-creed-valhalla.png',
    description: 'Стань викингом и отправься покорять Англию.',
  },
];

const codeVeinVersions = [
  {
    id: 'standard',
    name: 'Standard',
    edition: 'Стандартное издание',
    price: 349,
    discount: '−83%',
    image: '/images/ключи 2 игра стандарт версия.png',
  },
  {
    id: 'deluxe',
    name: 'Deluxe',
    edition: 'Deluxe Edition',
    price: 449,
    discount: '−85%',
    image: '/images/ключи 2 игра делюкс версия.png',
  },
];

function App() {
  const [page, setPage] = useState('intro');


  const [token, setToken] = useState(
    () => localStorage.getItem('gamehub_token') || ''
  );
  const [authLoading, setAuthLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [authError, setAuthError] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [accountLoading, setAccountLoading] = useState(false);

  const [search, setSearch] = useState('');
  const [expandedNews, setExpandedNews] = useState([]);

  const [selectedCaseId, setSelectedCaseId] = useState(1);
  const [caseSearch, setCaseSearch] = useState('');
  const [gameFilter, setGameFilter] = useState('Все игры');
  const [priceFilter, setPriceFilter] = useState('Любая цена');
  const [sortOrder, setSortOrder] = useState('По алфавиту (А–Я)');
  const [showCaseDetails, setShowCaseDetails] = useState(false);

  const [caseModal, setCaseModal] = useState(false);
  const [rouletteItems, setRouletteItems] = useState([]);
  const [roulettePosition, setRoulettePosition] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonItem, setWonItem] = useState(null);

  const [keySearch, setKeySearch] = useState('');
  const [keyGameFilter, setKeyGameFilter] = useState('Все игры');
  const [keyPriceFilter, setKeyPriceFilter] = useState('Любая цена');
  const [keySort, setKeySort] = useState('По алфавиту (А–Я)');

  const [selectedGame, setSelectedGame] = useState('codevein');
  const [selectedVersion, setSelectedVersion] = useState('deluxe');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState('balance');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [email, setEmail] = useState('player@example.com');
  const [userName, setUserName] = useState('пушинчик');
  const [avatar, setAvatar] = useState('/images/аватарка профиля.png');
  const [region, setRegion] = useState('Россия');

  const [balance, setBalance] = useState(5000);
  const [topUpAmount, setTopUpAmount] = useState(500);
  const [topUpMethod, setTopUpMethod] = useState('sbp');

  const [orderHistory, setOrderHistory] = useState([]);
  const [caseHistory, setCaseHistory] = useState([]);
  const [steamTradeUrl, setSteamTradeUrl] = useState('');
  const [caseHistoryModal, setCaseHistoryModal] = useState(false);
  const [tradeModal, setTradeModal] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [tradeSaving, setTradeSaving] = useState(false);
  const [tradeMessage, setTradeMessage] = useState('');
  const [notice, setNotice] = useState('');

  const loadAccountData = async (authToken = token) => {
    if (!authToken) return;

    const response = await fetch('/api/auth/account', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Не удалось загрузить данные аккаунта.');
    }

    setBalance(Number(result.data.balance ?? 0));
    setCaseHistory(result.data.caseHistory || []);
    setSteamTradeUrl(result.data.steamTradeUrl || '');
    setOrderHistory(
      (result.data.transactions || [])
        .filter((item) => item.type === 'purchase')
        .map((item) => ({
          id: item.ID_transaction,
          title: item.description || 'Покупка в GAMEHUB',
          price: Number(item.amount),
          date: item.created_at,
        }))
    );
  };

  const apiRequest = async (path, method = 'GET', body) => {
    if (!token) throw new Error('Сначала войдите в аккаунт.');

    const response = await fetch(path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Не удалось выполнить операцию.');
    }

    return result;
  };


  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setAuthChecking(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Сессия истекла. Войдите снова.');
        }

        const user = result.data;

        setUserName(user.username || 'пользователь');
        setEmail(user.email || '');
        setBalance(Number(user.balance ?? 0));
        await loadAccountData(token);

        setPage('home');
      } catch (error) {
        localStorage.removeItem('gamehub_token');
        setToken('');
        setAuthError(error.message);
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuth();
  }, [token]);

  const openPage = (nextPage) => {
    setPage(nextPage);
    setNotice('');
    setAuthError('');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };


  const handleAuth = async (event) => {
    event.preventDefault();
    setAuthError('');

    const form = new FormData(event.currentTarget);
    const enteredName = form.get('username');
    const enteredEmail = form.get('email');
    const enteredPassword = form.get('password');

    const isRegister = page === 'register';

    const endpoint = isRegister
      ? '/api/auth/register'
      : '/api/auth/login';

    const requestData = isRegister
      ? {
          username: String(enteredName || '').trim(),
          email: String(enteredEmail || '').trim(),
          password: String(enteredPassword || ''),
        }
      : {
          email: String(enteredEmail || '').trim(),
          password: String(enteredPassword || ''),
        };

    setAuthLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Не удалось выполнить авторизацию.'
        );
      }

      const user = result.data;

      if (!user.token) {
        throw new Error('Сервер не вернул токен авторизации.');
      }

      localStorage.setItem('gamehub_token', user.token);
      setToken(user.token);

      setUserName(user.username || String(enteredName || 'пользователь'));
      setEmail(user.email || String(enteredEmail || ''));
      setBalance(Number(user.balance ?? 0));
      await loadAccountData(user.token);

      openPage('home');
    } catch (error) {
      setAuthError(
        error.message || 'Не удалось подключиться к серверу.'
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('gamehub_token');
    setToken('');
    setUserName('пушинчик');
    setEmail('player@example.com');
    setBalance(5000);
    setOrderHistory([]);
    setCaseHistory([]);
    setSteamTradeUrl('');
    openPage('intro');
  };

  const saveProfile = async () => {
    if (!token) {
      setNotice('Необходимо войти в аккаунт.');
      return;
    }

    const updatedUsername = userName.trim();
    const updatedEmail = email.trim();

    if (!updatedUsername || !updatedEmail) {
      setNotice('Заполните имя пользователя и email.');
      return;
    }

    setProfileSaving(true);
    setNotice('');

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: updatedUsername,
          email: updatedEmail,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Не удалось сохранить профиль.');
      }

      setUserName(result.data.username);
      setEmail(result.data.email);
      setBalance(Number(result.data.balance ?? balance));

      setNotice('Изменения успешно сохранены!');
    } catch (error) {
      setNotice(error.message || 'Ошибка сохранения профиля.');
    } finally {
      setProfileSaving(false);
    }
  };

  const toggleNews = (index) => {
    setExpandedNews((prev) =>
      prev.includes(index)
        ? prev.filter((x) => x !== index)
        : [...prev, index]
    );
  };

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCases = useMemo(
    () =>
      cases
        .filter((item) =>
          item.name.toLowerCase().includes(caseSearch.toLowerCase())
        )
        .filter(
          (item) => gameFilter === 'Все игры' || item.game === gameFilter
        )
        .filter((item) =>
          priceFilter === 'До 150 ₽'
            ? item.price <= 150
            : priceFilter === '150–200 ₽'
              ? item.price > 150 && item.price <= 200
              : priceFilter === 'От 200 ₽'
                ? item.price > 200
                : true
        )
        .sort((a, b) =>
          sortOrder === 'По алфавиту (А–Я)'
            ? a.name.localeCompare(b.name, 'ru')
            : sortOrder === 'По алфавиту (Я–А)'
              ? b.name.localeCompare(a.name, 'ru')
              : sortOrder === 'Сначала дешевле'
                ? a.price - b.price
                : b.price - a.price
        ),
    [caseSearch, gameFilter, priceFilter, sortOrder]
  );

  const selectedCase =
    filteredCases.find((item) => item.id === selectedCaseId) ||
    filteredCases[0] ||
    null;

  const chooseCase = (id) => {
    setSelectedCaseId(id);
    setShowCaseDetails(false);
  };

  const startOpening = async () => {
    if (!selectedCase || isSpinning) return;

    if (!token) {
      setNotice('Чтобы открыть кейс, войдите в аккаунт.');
      openPage('login');
      return;
    }

    const pool = selectedCase.game === 'CS2' ? cs2Items : dotaItems;
    const winningItem = pool[Math.floor(Math.random() * pool.length)];

    setAccountLoading(true);
    setNotice('');

    try {
      const result = await apiRequest('/api/auth/case-openings', 'POST', {
        caseId: selectedCase.id,
        itemName: winningItem.name,
        itemImage: winningItem.image,
      });

      setBalance(Number(result.data.balance));
      setCaseHistory((previous) => [result.data.caseOpening, ...previous]);

      const targetIndex = 34;
      const generatedItems = Array.from(
        { length: 40 },
        () => pool[Math.floor(Math.random() * pool.length)]
      );
      generatedItems[targetIndex] = winningItem;

      setRouletteItems(generatedItems);
      setRoulettePosition(0);
      setWonItem(null);
      setCaseModal(true);
      setIsSpinning(true);

      window.setTimeout(() => {
        setRoulettePosition(targetIndex * 132 + 60);
      }, 100);

      window.setTimeout(() => {
        setIsSpinning(false);
        setWonItem(winningItem);
      }, 7100);
    } catch (error) {
      setNotice(error.message || 'Не удалось открыть кейс.');
    } finally {
      setAccountLoading(false);
    }
  };

  const closeCaseModal = () => {
    if (isSpinning) return;

    setCaseModal(false);
    setWonItem(null);
    setRouletteItems([]);
    setRoulettePosition(0);
  };

  const renderHeader = (activePage) => (
    <header className="header">
      <button className="logo logo-button" onClick={() => openPage('home')}>
        GAME<span>HUB</span>
      </button>

      <nav className="navigation">
        <button
          className={['keys', 'game', 'purchase', 'payment', 'card'].includes(activePage) ? 'active' : ''}
          onClick={() => openPage('keys')}
        >
          КЛЮЧИ
        </button>

        <button
          className={activePage === 'cases' ? 'active' : ''}
          onClick={() => openPage('cases')}
        >
          КЕЙСЫ
        </button>

        <button
          className={activePage === 'home' ? 'active' : ''}
          onClick={() => openPage('home')}
        >
          НОВОСТИ
        </button>

        <button
          className={['profile', 'editProfile', 'settings', 'balance'].includes(activePage) ? 'active' : ''}
          onClick={() => openPage('profile')}
        >
          ПРОФИЛЬ
        </button>
      </nav>
    </header>
  );

  const filteredGames = games
    .filter((g) => g.name.toLowerCase().includes(keySearch.toLowerCase()))
    .filter(
      (g) =>
        keyGameFilter === 'Все игры' ||
        (keyGameFilter === 'Steam' && true)
    )
    .filter((g) =>
      keyPriceFilter === 'Любая цена'
        ? true
        : keyPriceFilter === 'До 500 ₽'
          ? g.price <= 500
          : keyPriceFilter === '500–1000 ₽'
            ? g.price > 500 && g.price <= 1000
            : g.price > 1000
    )
    .sort((a, b) =>
      keySort === 'По алфавиту (А–Я)'
        ? a.name.localeCompare(b.name)
        : keySort === 'По алфавиту (Я–А)'
          ? b.name.localeCompare(a.name)
          : keySort === 'Сначала дешевле'
            ? a.price - b.price
            : b.price - a.price
    );

  const currentVersion =
    codeVeinVersions.find((v) => v.id === selectedVersion) ||
    codeVeinVersions[1];

  const currentProduct = selectedProduct || {
    ...currentVersion,
    gameName: 'Code Vein',
    image: currentVersion.image,
  };

  const finalPrice = Math.max(
    0,
    currentProduct.price -
      (promoApplied ? Math.round(currentProduct.price * 0.1) : 0)
  );

  const beginPurchase = (product) => {
    setSelectedProduct(product);
    setPromoCode('');
    setPromoApplied(false);
    setPaymentMethod('balance');
    openPage('purchase');
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'GAMEHUB10') {
      setPromoApplied(true);
      setNotice('Промокод применён: скидка 10%');
    } else {
      setPromoApplied(false);
      setNotice('Промокод не найден. Попробуй GAMEHUB10');
    }
  };

  const completeOrder = async () => {
    if (!token) {
      setNotice('Для покупки необходимо войти в аккаунт.');
      openPage('login');
      return;
    }

    setAccountLoading(true);
    setNotice('');

    try {
      const title = `${currentProduct.gameName || 'Code Vein'} — ${currentProduct.name || currentProduct.edition || 'Standard'}`;
      const result = await apiRequest('/api/auth/purchase', 'POST', {
        title,
        amount: finalPrice,
        useBalance: paymentMethod === 'balance',
      });

      setBalance(Number(result.data.balance));
      if (paymentMethod !== 'balance') {
        setNotice();
      }
      setOrderHistory((previous) => [
        {
          id: result.data.transaction.ID_transaction,
          title,
          price: finalPrice,
          date: result.data.transaction.created_at,
        },
        ...previous,
      ]);
      setCardNumber('');
      setCardExpiry('');
      setCardCvc('');
      openPage('success');
    } catch (error) {
      setNotice(error.message || 'Не удалось оформить покупку.');
      if (error.message?.toLowerCase().includes('баланс')) {
        setTimeout(() => openPage('balance'), 900);
      }
    } finally {
      setAccountLoading(false);
    }
  };

  const topUpBalance = async () => {
    setAccountLoading(true);
    setNotice('');
    try {
      const result = await apiRequest('/api/auth/top-up', 'POST', {
        amount: topUpAmount,
        method: topUpMethod,
      });
      setBalance(Number(result.data.balance));
      setNotice(`Баланс пополнен на ${topUpAmount} ₽ (демонстрационная операция).`);
    } catch (error) {
      setNotice(error.message || 'Не удалось пополнить баланс.');
    } finally {
      setAccountLoading(false);
    }
  };

  const openTradeModal = (item) => {
    setSelectedWithdrawal(item);
    setTradeMessage('');
    setTradeModal(true);
  };

  const sendTradeRequest = async (event) => {
    event.preventDefault();
    if (!selectedWithdrawal) return;

    setTradeSaving(true);
    setTradeMessage('');
    try {
      const result = await apiRequest('/api/auth/trade-request', 'POST', {
        historyId: selectedWithdrawal.ID_history,
        tradeUrl: steamTradeUrl.trim(),
      });
      setSteamTradeUrl(result.data.steamTradeUrl || steamTradeUrl.trim());
      setCaseHistory((previous) => previous.map((item) =>
        item.ID_history === selectedWithdrawal.ID_history
          ? { ...item, withdrawal_status: 'pending' }
          : item
      ));
      setTradeMessage('Заявка отправлена. Ожидайте приема трейда от продавца.');
    } catch (error) {
      setTradeMessage(error.message || 'Не удалось отправить заявку.');
    } finally {
      setTradeSaving(false);
    }
  };

  const renderFooter = () => (
    <footer className="footer">
      GAMEHUB <span>© 2026</span>
    </footer>
  );

  const renderProductImage = (src, alt, className = '') => (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={(e) => {
        e.currentTarget.style.visibility = 'hidden';
      }}
    />
  );

  return (
    <main className="app">
      <div className="background-glow" />

      {page === 'intro' && (
        <>
          <header className="intro-header">
            <button
              className="logo logo-button"
              onClick={() => openPage('intro')}
            >
              GAME<span>HUB</span>
            </button>
          </header>

          <section className="welcome-screen">
            <div className="welcome-content">
              <p className="eyebrow">YOUR GAMING SPACE</p>

              <h1>
                WELCOME TO
                <span>GAMEHUB</span>
              </h1>

              <p className="welcome-subtitle">
                Твоя игровая вселенная начинается здесь
              </p>

              <div className="welcome-actions">
                <button
                  className="glass-button"
                  onClick={() => openPage('login')}
                >
                  Войти в аккаунт <span>→</span>
                </button>

                <button
                  className="text-button"
                  onClick={() => openPage('register')}
                >
                  Ещё нет аккаунта? Зарегистрироваться
                </button>
              </div>
            </div>

            {renderFooter()}
          </section>
        </>
      )}

      {page === 'login' && (
        <section className="auth-screen">
          <div className="auth-card">
            <p className="eyebrow">WELCOME BACK</p>
            <h1>Вход</h1>
            <p className="subtitle">Рады видеть тебя снова</p>

            <form onSubmit={handleAuth}>
              <label htmlFor="login-email">Электронная почта</label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
              />

              <label htmlFor="login-password">Пароль</label>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="Введи пароль"
                required
              />

              {authError && <p className="notice-text">{authError}</p>}

              <button className="glass-button" type="submit" disabled={authLoading}>
                {authLoading ? 'ПОДОЖДИ...' : 'Войти'} <span>→</span>
              </button>
            </form>

            <button
              className="text-button"
              onClick={() => openPage('register')}
            >
              Нет аккаунта? Зарегистрироваться
            </button>

            <button
              className="text-button"
              onClick={() => openPage('intro')}
            >
              ← На приветственный экран
            </button>
          </div>
        </section>
      )}

      {page === 'register' && (
        <section className="auth-screen">
          <div className="auth-card">
            <p className="eyebrow">JOIN THE COMMUNITY</p>
            <h1>Регистрация</h1>
            <p className="subtitle">Создай свой аккаунт GAMEHUB</p>

            <form onSubmit={handleAuth}>
              <label htmlFor="register-name">Имя пользователя</label>
              <input
                id="register-name"
                name="username"
                type="text"
                placeholder="Твой никнейм"
                required
              />

              <label htmlFor="register-email">Электронная почта</label>
              <input
                id="register-email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
              />

              <label htmlFor="register-password">Пароль</label>
              <input
                id="register-password"
                name="password"
                type="password"
                placeholder="Придумай пароль"
                minLength={6}
                required
              />

              {authError && <p className="notice-text">{authError}</p>}

              <button className="glass-button" type="submit" disabled={authLoading}>
                {authLoading ? 'ПОДОЖДИ...' : 'Создать аккаунт'} <span>→</span>
              </button>
            </form>

            <button
              className="text-button"
              onClick={() => openPage('login')}
            >
              Уже есть аккаунт? Войти
            </button>

            <button
              className="text-button"
              onClick={() => openPage('intro')}
            >
              ← На приветственный экран
            </button>
          </div>
        </section>
      )}

      {page === 'home' && (
        <>
          {renderHeader('home')}

          <section className="news-page">
            <div className="news-heading">
              <h1>ЧТО НОВОГО?</h1>

              <div className="search">
                <input
                  placeholder="ПОИСК"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span className="search-icon" />
              </div>
            </div>

            <div className="news-list">
              {filteredNews.length ? (
                filteredNews.map((item) => {
                  const index = news.indexOf(item);
                  const expanded = expandedNews.includes(index);

                  return (
                    <article className="news-card" key={index}>
                      <h2>{item.title}</h2>

                      <div className="news-content">
                        <div className="news-image-block">
                          {renderProductImage(item.image, item.title)}

                          <button
                            className="read-more"
                            onClick={() => toggleNews(index)}
                          >
                            {expanded ? 'СКРЫТЬ' : 'ЧИТАТЬ ДАЛЕЕ'}
                          </button>
                        </div>

                        <div className="news-text-column">
                          <div className="news-intro">{item.intro}</div>

                          <div
                            className={`news-description ${expanded ? 'expanded' : ''}`}
                          >
                            {item.fullText}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p className="empty-search">
                  По вашему запросу ничего не найдено.
                </p>
              )}
            </div>
          </section>

          {renderFooter()}
        </>
      )}

      {page === 'cases' && (
        <>
          {renderHeader('cases')}

          <section className="cases-page">
            <div className="case-filters">
              <label className="case-search">
                <input
                  value={caseSearch}
                  onChange={(e) => setCaseSearch(e.target.value)}
                  placeholder="ПОИСК"
                />
                <span className="search-icon" />
              </label>

              <select
                value={gameFilter}
                onChange={(e) => setGameFilter(e.target.value)}
              >
                <option>Все игры</option>
                <option>Dota 2</option>
                <option>CS2</option>
              </select>

              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option>Любая цена</option>
                <option>До 150 ₽</option>
                <option>150–200 ₽</option>
                <option>От 200 ₽</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option>По алфавиту (А–Я)</option>
                <option>По алфавиту (Я–А)</option>
                <option>Сначала дешевле</option>
                <option>Сначала дороже</option>
              </select>
            </div>

            {selectedCase ? (
              <div className="case-showcase">
                <div className="case-main">
                  <div className="case-info">
                    <span className="case-new-label">НОВИНКИ</span>

                    <h1>
                      кейс <span>«{selectedCase.name}»</span>
                    </h1>

                    <p className="case-tagline">
                      {selectedCase.description}
                    </p>

                    <div className="case-actions">
                      <button
                        className="case-action-button"
                        onClick={startOpening}
                        disabled={isSpinning || accountLoading}
                      >
                        ОТКРЫТЬ КЕЙС
                      </button>

                      <button
                        className="case-action-button"
                        onClick={() => setShowCaseDetails((v) => !v)}
                      >
                        {showCaseDetails ? 'СКРЫТЬ' : 'ПОДРОБНЕЕ'}
                      </button>
                    </div>
                  </div>

                  {renderProductImage(
                    selectedCase.image,
                    `Кейс ${selectedCase.name}`,
                    'case-cover'
                  )}
                </div>

                {showCaseDetails && (
                  <div className="case-details">
                    <h2>О кейсе «{selectedCase.name}»</h2>
                    <p>{selectedCase.details}</p>
                    <p className="case-price">
                      Стоимость: {selectedCase.price} ₽
                    </p>
                  </div>
                )}

                <div className="case-switcher">
                  {filteredCases.map((item) => (
                    <button
                      key={item.id}
                      className={selectedCase.id === item.id ? 'selected' : ''}
                      onClick={() => chooseCase(item.id)}
                    >
                      {renderProductImage(item.image, '')}
                      <span>{item.name}</span>
                      <small>
                        {item.game} · {item.price} ₽
                      </small>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="empty-search">
                По заданным фильтрам кейсы не найдены.
              </p>
            )}
          </section>

          {caseModal && (
            <div className="modal-backdrop">
              <div className="roulette-modal">
                <button
                  className="modal-close"
                  onClick={closeCaseModal}
                  disabled={isSpinning || accountLoading}
                >
                  ×
                </button>

                <p className="eyebrow">GAMEHUB CASE</p>
                <h2>Открытие кейса «{selectedCase?.name}»</h2>

                <p className="roulette-hint">
                  {isSpinning
                    ? 'Ищем твой предмет...'
                    : 'Твой предмет найден!'}
                </p>

                <div className="roulette-window">
                  <div className="roulette-pointer" />

                  <div
                    className={`roulette-track ${isSpinning ? 'spinning' : 'stopped'}`}
                    style={{
                      transform: `translateX(-${roulettePosition}px)`,
                    }}
                  >
                    {rouletteItems.map((item, index) => (
                      <div className="roulette-item" key={index}>
                        {renderProductImage(item.image, item.name)}
                      </div>
                    ))}
                  </div>
                </div>

                {wonItem && (
                  <div className="won-item">
                    <p className="won-label">ТЕБЕ ВЫПАЛО</p>
                    {renderProductImage(wonItem.image, wonItem.name)}
                    <h3>{wonItem.name}</h3>

                    <button
                      className="glass-button"
                      onClick={closeCaseModal}
                    >
                      ЗАБРАТЬ ПРЕДМЕТ
                    </button>
                  </div>
                )}

                {isSpinning && (
                  <p className="roulette-note">
                    Не закрывай окно до завершения анимации
                  </p>
                )}
              </div>
            </div>
          )}

          {renderFooter()}
        </>
      )}

      {page === 'keys' && (
        <>
          {renderHeader('keys')}

          <section className="keys-page">
            <div className="key-filters">
              <label className="case-search">
                <input
                  placeholder="ПОИСК"
                  value={keySearch}
                  onChange={(e) => setKeySearch(e.target.value)}
                />
                <span className="search-icon" />
              </label>

              <select
                value={keyGameFilter}
                onChange={(e) => setKeyGameFilter(e.target.value)}
              >
                <option>Все игры</option>
                <option>Steam</option>
              </select>

              <select
                value={keyPriceFilter}
                onChange={(e) => setKeyPriceFilter(e.target.value)}
              >
                <option>Любая цена</option>
                <option>До 500 ₽</option>
                <option>500–1000 ₽</option>
                <option>От 1000 ₽</option>
              </select>

              <select
                value={keySort}
                onChange={(e) => setKeySort(e.target.value)}
              >
                <option>По алфавиту (А–Я)</option>
                <option>По алфавиту (Я–А)</option>
                <option>Сначала дешевле</option>
                <option>Сначала дороже</option>
              </select>
            </div>

            {!keySearch && keyGameFilter === 'Все игры' && (
              <h2 className="section-title">ПОПУЛЯРНЫЕ</h2>
            )}

            <div className="key-grid">
              {filteredGames.map((game) => (
                <button
                  className="key-game-card"
                  key={game.id}
                  onClick={() => {
                    setSelectedGame(game.id);
                    setSelectedProduct({ ...game, gameName: game.name, name: 'Ключ' });
                    openPage('game');
                  }}
                >
                  {renderProductImage(game.image, game.name)}
                  <span className="key-game-price">
                    от {game.price} руб.
                  </span>
                </button>
              ))}
            </div>

            {(!keySearch || 'code vein'.includes(keySearch.toLowerCase())) && (
              <section className="code-vein-row">
                <h2 className="section-title">CODE VEIN</h2>

                {codeVeinVersions.map((version) => (
                  <article className="version-card" key={version.id}>
                    {renderProductImage(
                      version.image,
                      `Code Vein ${version.name}`,
                      'version-cover'
                    )}

                    <div className="version-info">
                      <h3>{version.name}</h3>
                      <p>ЭКОНОМИЯ {version.discount}</p>
                      <strong>{version.price} руб.</strong>

                      <button
                        className="buy-button"
                        onClick={() => {
                          setSelectedGame('codevein');
                          setSelectedVersion(version.id);
                          beginPurchase({
                            ...version,
                            gameName: 'Code Vein',
                            image: version.image,
                          });
                        }}
                      >
                        КУПИТЬ <span>▱</span>
                      </button>
                    </div>
                  </article>
                ))}
              </section>
            )}
          </section>

          {renderFooter()}
        </>
      )}

      {page === 'game' && (
        <>
          {renderHeader('game')}

          <section className="game-detail-page">
            <button className="back-button" onClick={() => openPage('keys')}>
              НАЗАД
            </button>

            <div className="game-detail-grid">
              {renderProductImage(
                games.find((g) => g.id === selectedGame)?.image || '/images/ключи 1 первая игра.png',
                `Обложка игры ${games.find((g) => g.id === selectedGame)?.name || ''}`,
                'game-detail-cover'
              )}

              <div>
                <p className="eyebrow">GAMEHUB STORE</p>

                <h1>{games.find((g) => g.id === selectedGame)?.name || 'Игровой ключ'}</h1>

                <p className="game-description">
                  {games.find((g) => g.id === selectedGame)?.description || 'Электронный ключ для выбранной игры.'}
                </p>

                <p className="game-description">
                  Электронный ключ для активации игры
                </p>

                <button
                  className="glass-button"
                  onClick={() =>
                    beginPurchase({
                      ...games.find((g) => g.id === selectedGame),
                      gameName: games.find((g) => g.id === selectedGame)?.name,
                      name: 'Ключ',
                    })
                  }
                >
                  Купить от{' '}
                  {games.find((g) => g.id === selectedGame)?.price} ₽
                  <span>→</span>
                </button>
              </div>
            </div>
          </section>

          {renderFooter()}
        </>
      )}

      {page === 'purchase' && (
        <>
          {renderHeader('purchase')}

          <section className="purchase-page">
            <button className="back-button" onClick={() => openPage('keys')}>
              НАЗАД
            </button>

            <div className="purchase-overview">
              <div className="purchase-cover-wrap">
                {renderProductImage(
                  currentProduct.image,
                  currentProduct.gameName || 'Игра',
                  'purchase-cover'
                )}
              </div>

              <div className="purchase-description">
                <p className="edition-name">
                  {currentProduct.gameName || 'Code Vein'} — {currentProduct.edition || currentProduct.name || 'Standard'}
                </p>

                <p className="discount-label">
                  ЭКОНОМИЯ {currentProduct.discount || '−80%'}
                </p>

                <p className="purchase-price">{finalPrice} руб.</p>

                <p className="game-description">
                  {currentProduct.description || `Электронный ключ для игры ${currentProduct.gameName || 'Code Vein'}.`}
                </p>

                <button
                  className="buy-button purchase-buy"
                  onClick={() => openPage('payment')}
                >
                  КУПИТЬ <span>▱</span>
                </button>
              </div>
            </div>
          </section>

          {renderFooter()}
        </>
      )}

      {page === 'payment' && (
        <>
          {renderHeader('payment')}

          <section className="purchase-page payment-page">
            <button className="back-button" onClick={() => openPage('purchase')}>
              НАЗАД
            </button>

            <div className="payment-layout">
              <div className="payment-options">
                <h2>СПОСОБ ОПЛАТЫ:</h2>

                <button
                  className={paymentMethod === 'balance' ? 'payment-choice selected' : 'payment-choice'}
                  onClick={() => setPaymentMethod('balance')}
                >
                  БАЛАНС GAMEHUB ({balance.toLocaleString('ru-RU')} ₽)
                </button>

                <button
                  className={
                    paymentMethod === 'sbp'
                      ? 'payment-choice selected'
                      : 'payment-choice'
                  }
                  onClick={() => setPaymentMethod('sbp')}
                >
                  СБП
                </button>

                <button
                  className={
                    paymentMethod === 'card'
                      ? 'payment-choice selected'
                      : 'payment-choice'
                  }
                  onClick={() => setPaymentMethod('card')}
                >
                  банковская карта
                </button>

                <div className="promo-row">
                  <input
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoApplied(false);
                    }}
                    placeholder="ПРОМОКОД"
                  />

                  <button className="promo-apply" onClick={applyPromo}>
                    Применить
                  </button>
                </div>

                {notice && <p className="notice-text">{notice}</p>}
              </div>

              <div className="payment-summary">
                {renderProductImage(
                  currentProduct.image,
                  'Выбранная игра',
                  'payment-cover'
                )}

                <div>
                  <p className="edition-name">
                    {currentProduct.gameName || 'Code Vein'} — {currentProduct.edition || currentProduct.name || 'Standard'}
                  </p>

                  <p className="discount-label">
                    ЭКОНОМИЯ {currentProduct.discount || '−80%'}
                  </p>
                </div>

                <div className="payment-total">
                  <strong>{finalPrice} руб.</strong>

                  <button
                    className="buy-button"
                    onClick={() =>
                      paymentMethod === 'card'
                        ? openPage('card')
                        : completeOrder()
                    }
                    disabled={accountLoading}
                  >
                    {accountLoading ? 'ОБРАБОТКА...' : 'ОПЛАТИТЬ'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {renderFooter()}
        </>
      )}

      {page === 'card' && (
        <>
          {renderHeader('card')}

          <section className="purchase-page card-page">
            <div className="card-form-area">
              <button className="payment-choice selected card-heading">
                БАНКОВСКАЯ КАРТА
              </button>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  completeOrder();
                }}
              >
                <label htmlFor="card-number">Номер карты</label>
                <input
                  id="card-number"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(
                      e.target.value.replace(/[^\d ]/g, '').slice(0, 19)
                    )
                  }
                  required
                />

                <div className="card-small-fields">
                  <div>
                    <label htmlFor="card-expiry">Срок действия карты</label>
                    <input
                      id="card-expiry"
                      placeholder="ММ/ГГ"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="card-cvc">Код (CVC/CVV)</label>
                    <input
                      id="card-cvc"
                      type="password"
                      inputMode="numeric"
                      maxLength={3}
                      placeholder="•••"
                      value={cardCvc}
                      onChange={(e) =>
                        setCardCvc(e.target.value.replace(/\D/g, ''))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="card-submit-row">
                  <strong>{finalPrice} руб.</strong>
                  <button className="buy-button" type="submit">
                    ОПЛАТИТЬ
                  </button>
                </div>
              </form>


            </div>

            {renderProductImage(
              currentProduct.image,
              'Обложка игры',
              'payment-cover card-game-cover'
            )}
          </section>

          {renderFooter()}
        </>
      )}

      {page === 'success' && (
        <>
          {renderHeader('keys')}

          <section className="success-page">
            <div className="success-content">
              {renderProductImage(
                currentProduct.image,
                'Купленная игра',
                'success-cover'
              )}

              <div>
                <p className="success-title">Спасибо за покупку!</p>

                <h1>
                  Демо-заказ успешно оформлен! Спасибо, что выбираешь GAMEHUB.
                </h1>


                <p className="success-email">
                  Аккаунт: {email}
                </p>

                <button
                  className="glass-button"
                  onClick={() => openPage('keys')}
                >
                  Вернуться в каталог <span>→</span>
                </button>
              </div>
            </div>
          </section>

          {renderFooter()}
        </>
      )}

      {page === 'profile' && (
        <>
          {renderHeader('profile')}

          <section className="profile-page">
            <div className="profile-panel">
              <div className="profile-top">
                <div className="avatar-block">
                  {renderProductImage(
                    avatar,
                    'Аватар пользователя',
                    'profile-avatar'
                  )}

                  <button
                    className="subtle-link"
                    onClick={() => openPage('editProfile')}
                  >
                    изменить аватар
                  </button>
                </div>

                <div className="profile-identity">
                  <h1>ИМЯ ПОЛЬЗОВАТЕЛЯ:</h1>
                  <p>{userName}</p>

                  <h2>дата регистрации:</h2>
                  <p>06.07.2026</p>
                </div>

                <div className="profile-actions">
                  <button
                    className="profile-pill"
                    onClick={() => openPage('editProfile')}
                  >
                    настройки
                  </button>

                  <button
                    className="profile-pill"
                    onClick={() => openPage('balance')}
                  >
                    баланс
                  </button>
                </div>
              </div>

              <div className="profile-stats">
                <button
                  className="stat-card stat-card-button"
                  onClick={() => setCaseHistoryModal(true)}
                >
                  <div className="stat-illustration case-stat-art">♜</div>
                  <div>
                    <strong>ОТКРЫТО КЕЙСОВ: {caseHistory.length}</strong>
                    <small>нажми, чтобы посмотреть историю</small>
                  </div>
                </button>

                <div className="stat-card">
                  <div className="stat-illustration steam-art">
                    STEAM
                    <small>RANDOM KEYS</small>
                  </div>
                  <div>
                    <strong>
                      КУПЛЕНО КЛЮЧЕЙ: {orderHistory.length}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="profile-bottom">
                <div>
                  <span>Баланс аккаунта</span>
                  <strong>{balance.toLocaleString('ru-RU')} ₽</strong>
                </div>

                <button
                  className="profile-pill"
                  onClick={() => openPage('settings')}
                >
                  Дополнительные настройки
                </button>
              </div>
            </div>
          </section>

          {renderFooter()}
        </>
      )}

      {page === 'editProfile' && (
        <>
          {renderHeader('editProfile')}

          <section className="profile-page">
            <div className="profile-panel edit-profile-panel">
              <div className="edit-profile-top">
                <div className="avatar-block">
                  {renderProductImage(
                    avatar,
                    'Аватар пользователя',
                    'profile-avatar'
                  )}

                  <label className="subtle-link upload-avatar">
                    изменить аватар
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setAvatar(URL.createObjectURL(file));
                      }}
                    />
                  </label>
                </div>

                <div className="edit-name">
                  <label htmlFor="edit-name">ИМЯ ПОЛЬЗОВАТЕЛЯ:</label>
                  <input
                    id="edit-name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>

                <div className="profile-actions">
                  <button
                    className="profile-pill"
                    onClick={saveProfile}
                    disabled={profileSaving}
                  >
                    {profileSaving ? 'СОХРАНЕНИЕ...' : 'сохранить изменения'}
                  </button>

                  <button
                    className="profile-pill"
                    onClick={() => openPage('profile')}
                  >
                    назад
                  </button>
                </div>
              </div>

              <div className="settings-tiles">
                <button onClick={() => openPage('settings')}>
                  сменить пароль
                </button>
                <button onClick={() => openPage('settings')}>
                  сменить регион
                </button>
                <button onClick={logout}>
                  сменить аккаунт
                </button>
              </div>

              {notice && <p className="notice-text">{notice}</p>}
            </div>
          </section>

          {renderFooter()}
        </>
      )}

      {page === 'settings' && (
        <>
          {renderHeader('settings')}

          <section className="profile-page">
            <div className="profile-panel settings-page-panel">
              <button
                className="back-button"
                onClick={() => openPage('profile')}
              >
                НАЗАД
              </button>

              <h1 className="section-title">НАСТРОЙКИ</h1>

              <form
                className="settings-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  saveProfile();
                }}
              >
                <label htmlFor="settings-email">Электронная почта</label>
                <input
                  id="settings-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="settings-region">Регион</label>
                <select
                  id="settings-region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option>Россия</option>
                  <option>Германия</option>
                  <option>Казахстан</option>
                  <option>Беларусь</option>
                  <option>Украина</option>
                </select>

                <label htmlFor="settings-password">Новый пароль</label>
                <input
                  id="settings-password"
                  type="password"
                  placeholder="Оставь пустым, если не меняешь"
                />

                <button
                  className="glass-button"
                  type="submit"
                  disabled={profileSaving}
                >
                  {profileSaving ? 'СОХРАНЕНИЕ...' : 'СОХРАНИТЬ ИЗМЕНЕНИЯ'}
                </button>
              </form>

              <button
                className="text-button danger-link"
                onClick={logout}
              >
                Выйти из аккаунта
              </button>

              {notice && <p className="notice-text">{notice}</p>}
            </div>
          </section>

          {renderFooter()}
        </>
      )}

      {page === 'balance' && (
        <>
          {renderHeader('balance')}

          <section className="profile-page">
            <div className="profile-panel balance-panel">
              <div className="balance-heading">
                <h1>БАЛАНС</h1>
                <button
                  className="profile-pill"
                  onClick={() => openPage('profile')}
                >
                  назад
                </button>
              </div>

              <div className="balance-current">
                ТЕКУЩИЙ БАЛАНС:{' '}
                <strong>{balance.toLocaleString('ru-RU')} руб.</strong>
              </div>

              <p className="wallet-demo-note">Пополнение и покупки с баланса работают в демонстрационном режиме. Реальные платежи не выполняются.</p>

              <div className="topup-box">
                <div className="topup-left">
                  <h2>ПОПОЛНЕНИЕ БАЛАНСА</h2>
                  <p>СУММА ПОПОЛНЕНИЯ:</p>

                  <div className="amount-options">
                    {[100, 500, 1000].map((amount) => (
                      <button
                        key={amount}
                        className={topUpAmount === amount ? 'selected' : ''}
                        onClick={() => setTopUpAmount(amount)}
                      >
                        {amount} руб.
                      </button>
                    ))}
                  </div>
                </div>

                <div className="topup-right">
                  <h2>СПОСОБ ОПЛАТЫ:</h2>

                  <div className="method-options">
                    <button
                      className={topUpMethod === 'sbp' ? 'selected' : ''}
                      onClick={() => setTopUpMethod('sbp')}
                    >
                      СБП
                    </button>

                    <button
                      className={topUpMethod === 'card' ? 'selected' : ''}
                      onClick={() => setTopUpMethod('card')}
                    >
                      карта
                    </button>
                  </div>

                  <button
                    className="glass-button"
                    onClick={topUpBalance}
                    disabled={accountLoading}
                  >
                    {accountLoading ? 'ОБРАБОТКА...' : 'ОПЛАТИТЬ (ДЕМО)'}
                  </button>
                </div>
              </div>

              {notice && <p className="notice-text">{notice}</p>}
            </div>
          </section>

          {renderFooter()}
        </>
      )}

      {caseHistoryModal && (
        <div className="modal-backdrop" onClick={() => setCaseHistoryModal(false)}>
          <section className="account-modal history-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setCaseHistoryModal(false)}>×</button>
            <p className="eyebrow">GAMEHUB PROFILE</p>
            <h2>ИСТОРИЯ ОТКРЫТИЯ КЕЙСОВ</h2>
            {caseHistory.length === 0 ? (
              <p className="empty-search">Пока нет открытых кейсов. Открой первый кейс, и результат появится здесь.</p>
            ) : (
              <div className="case-history-list">
                {caseHistory.map((item) => (
                  <article className="case-history-item" key={item.ID_history}>
                    {renderProductImage(item.item_image, item.item_name, 'case-history-image')}
                    <div className="case-history-info">
                      <strong>{item.case_name}</strong>
                      <span>Выпало: {item.item_name}</span>
                      <small>{new Date(item.opened_at).toLocaleString('ru-RU')}</small>
                    </div>
                    <button
                      className="profile-pill withdraw-button"
                      onClick={() => openTradeModal(item)}
                      disabled={item.withdrawal_status !== 'available'}
                    >
                      {item.withdrawal_status === 'pending' ? 'ЗАЯВКА ОТПРАВЛЕНА' : 'ВЫВЕСТИ ВЫИГРЫШ'}
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {tradeModal && selectedWithdrawal && (
        <div className="modal-backdrop" onClick={() => setTradeModal(false)}>
          <section className="account-modal trade-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setTradeModal(false)}>×</button>
            <p className="eyebrow">STEAM TRADE</p>
            <div className="steam-trade-heading">
              <span className="steam-trade-icon">↗</span>
              <h2>ВЫВОД ВЫИГРЫША</h2>
            </div>
            <p className="trade-item-summary">{selectedWithdrawal.item_name} · кейс «{selectedWithdrawal.case_name}»</p>
            <form onSubmit={sendTradeRequest} className="trade-form">
              <label htmlFor="steam-trade-url">Твоя ссылка обмена Steam</label>
              <input
                id="steam-trade-url"
                type="url"
                value={steamTradeUrl}
                onChange={(event) => setSteamTradeUrl(event.target.value)}
                placeholder="https://steamcommunity.com/tradeoffer/new/?partner=..."
                required
              />
              <p className="trade-help">Скопируй ссылку обмена в настройках инвентаря Steam и вставь её сюда.</p>
              <button className="glass-button" type="submit" disabled={tradeSaving}>
                {tradeSaving ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ'}
              </button>
            </form>
            {tradeMessage && <p className="notice-text trade-message">{tradeMessage}</p>}
          </section>
        </div>
      )}
    </main>
  );
}

export default App;

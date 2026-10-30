import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Image,
  BackHandler,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Switch,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import * as Picker from "expo-image-picker";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { useGame } from "./game/context";
import { photos, prompts, type Mode, type Player } from "./game/engine";
import { demoService } from "./game/services";
import {
  Art,
  Avatar,
  Body,
  Button,
  Card,
  Field,
  Icon,
  Heart,
  IconButton,
  Label,
  Photo,
  Title,
  Wordmark,
  s,
} from "./ui/components";
import { C, F } from "./ui/theme";
const modes: {
  id: Mode;
  title: string;
  desc: string;
  color: string;
  tag: string;
  steps: string[];
}[] = [
  {
    id: "album",
    title: "Album Hunt",
    desc: "Search your camera roll.",
    color: "#FFE1BD",
    tag: "A CAMERA ROLL ADVENTURE",
    steps: [
      "Get the same prompt as your friends.",
      "Find a matching photo in your library.",
      "Submit, reveal, and defend your find.",
    ],
  },
  {
    id: "live",
    title: "Live Hunt",
    desc: "Get up. Find it. Snap it.",
    color: "#DFEDCA",
    tag: "READY, SET, SNAP",
    steps: [
      "A fresh prompt starts the countdown.",
      "Find your subject and take a new photo.",
      "Beat the clock to keep your lives.",
    ],
  },
  {
    id: "battle",
    title: "Photo Battle",
    desc: "Let the best photo win.",
    color: "#FFF0B2",
    tag: "A LITTLE FRIENDLY COMPETITION",
    steps: [
      "Choose or capture your best photo.",
      "Vote anonymously for your favorite.",
      "Collect votes. Climb to the top.",
    ],
  },
];
const go = (screen: string, params?: Record<string, string>) =>
  router.push({ pathname: "/[page]", params: { page: screen, ...params } });
const enterHome = () =>
  router.replace({ pathname: "/[page]", params: { page: "home" } });

export function Welcome() {
  const { height } = useWindowDimensions();
  const compact = height < 740;
  return (
    <SafeAreaView style={st.fixedScreen}>
      <Image
        source={require("../assets/background.png")}
        style={st.screenBackground}
        resizeMode="stretch"
        accessible={false}
        pointerEvents="none"
      />
      <View style={st.welcomeContent}>
        <View style={{ gap: compact ? 6 : 12, alignItems: "center" }}>
          <Label>WELCOME TO THE HUNT</Label>
          <Wordmark large={!compact} />
          <Title>Find it. Snap it. Win it.</Title>
        </View>
        <View style={st.welcomeArt}>
          {height >= 620 && (
            <Art mode="album" large={!compact} compact={compact} />
          )}
          <View style={st.welcomeBadge}>
            <Icon name="aperture" size={17} />
            <Label>YOUR NEXT ADVENTURE AWAITS</Label>
          </View>
        </View>
        <View style={{ gap: 14 }}>
          <Button
            title="Sign In"
            icon="arrow-right"
            onPress={() => go("login")}
          />
          <Button
            title="Create Account"
            secondary
            onPress={() => go("signup")}
          />
          <Pressable
            accessibilityRole="button"
            onPress={enterHome}
            style={{
              minHeight: 48,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: C.cream,
              borderRadius: 14,
            }}
          >
            <Text style={st.bold}>Skip</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
function Shell({
  children,
  title,
  home = false,
  onBack,
}: {
  children: React.ReactNode;
  title?: string;
  home?: boolean;
  onBack?: () => void;
}) {
  return (
    <SafeAreaView
      style={home ? st.fixedScreen : { flex: 1, backgroundColor: C.cream }}
    >
      {home && (
        <Image
          source={require("../assets/background.png")}
          style={st.screenBackground}
          resizeMode="stretch"
          accessible={false}
          pointerEvents="none"
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={st.container}>
          <View style={st.header}>
            {home ? (
              <Wordmark />
            ) : (
              <View style={s.row}>
                <IconButton
                  name="arrow-left"
                  label="Go back"
                  onPress={
                    onBack ||
                    (() => (router.canGoBack() ? router.back() : enterHome()))
                  }
                />
                <Text style={{ fontFamily: F.bold, color: C.green }}>
                  {title}
                </Text>
              </View>
            )}
            <View style={s.row}>
              {home && (
                <IconButton
                  name="users"
                  label="Friends"
                  onPress={() => go("friends")}
                />
              )}
              <Pressable
                accessibilityLabel="My profile"
                onPress={() => (onBack ? onBack() : go("profile"))}
              >
                <Avatar name={useGame().name} size={44} />
              </Pressable>
            </View>
          </View>
          {home ? (
            <View style={st.homeContent}>{children}</View>
          ) : (
            <ScrollView
              contentContainerStyle={st.content}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {children}
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
function Note({
  children,
  error = false,
}: {
  children: React.ReactNode;
  error?: boolean;
}) {
  return (
    <Text
      accessibilityLiveRegion="polite"
      style={{
        color: error ? C.error : C.muted,
        fontFamily: F.body,
        fontSize: 12,
        lineHeight: 18,
      }}
    >
      {children}
    </Text>
  );
}
const sampleInvite: { playerCount: number; status: "lobby" | "playing" } = {
  playerCount: 3,
  status: "lobby",
};

export function Home() {
  const { name, create } = useGame();
  const [invite, setInvite] = useState(true);
  return (
    <Shell home>
      {invite && (
        <Card style={{ backgroundColor: "#EAF0DD", padding: 12, gap: 10 }}>
          <View style={s.row}>
            <Avatar name="Joshua" color="#C5D6B1" size={38} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text
                style={st.bold}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
              >
                Joshua invited you to Album Hunt
              </Text>
              <Text style={st.small}>
                {sampleInvite.playerCount} players ·{" "}
                {sampleInvite.status === "lobby" ? "In lobby" : "Playing"}
              </Text>
            </View>
          </View>
          <View style={s.row}>
            <View style={{ flex: 1 }}>
              <Button
                title="Let's go"
                icon="arrow-up-right"
                onPress={() => {
                  create("album", true);
                  go("lobby");
                }}
              />
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => setInvite(false)}
              style={{ padding: 14 }}
            >
              <Text style={st.bold}>Decline</Text>
            </Pressable>
          </View>
        </Card>
      )}

      <View style={{ flex: 1, gap: 10 }}>
        {modes.map((m) => (
          <Pressable
            key={m.id}
            accessibilityRole="button"
            accessibilityLabel={`Play ${m.title}`}
            onPress={() => go("mode", { mode: m.id })}
            style={({ pressed }) => [
              st.mode,
              {
                backgroundColor: m.color,
                transform: [{ translateY: pressed ? 3 : 0 }],
              },
            ]}
          >
            <View style={{ flex: 1, gap: 4 }}>
              <Text
                style={{ fontFamily: F.title, fontSize: 24, color: C.green }}
              >
                {m.title}
              </Text>
              <Text
                style={{
                  fontFamily: F.body,
                  color: C.green,
                  fontSize: 12,
                  lineHeight: 18,
                }}
              >
                {m.desc}
              </Text>
              <View style={st.play}>
                <Text style={st.bold}>Let’s play</Text>
                <Icon name="arrow-right" size={17} />
              </View>
            </View>
            <Art mode={m.id} compact />
          </Pressable>
        ))}
      </View>
      <Button
        title="Join with a room code"
        secondary
        icon="hash"
        onPress={() => go("join")}
      />
    </Shell>
  );
}
function ModeDetails() {
  const { mode } = useLocalSearchParams<{ mode: Mode }>();
  const m = modes.find((x) => x.id === mode) || modes[0];
  const { create } = useGame();
  return (
    <Shell title="The adventure">
      <View style={[st.artHero, { backgroundColor: m.color }]}>
        <Art mode={m.id} large />
        <Label>{m.tag}</Label>
        <Title>{m.title}</Title>
      </View>
      <Title small>Here’s the game plan.</Title>
      {m.steps.map((step, i) => (
        <View key={step} style={s.row}>
          <View style={st.number}>
            <Text style={st.bold}>{i + 1}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Body>{step}</Body>
          </View>
        </View>
      ))}
      <Card>
        <View style={s.spread}>
          <Label>{m.id === "album" ? "30" : "60"} SEC / ROUND</Label>
          <Label>
            {m.id === "battle"
              ? "5 ROUNDS · VOTES = POINTS"
              : "3 LIVES · LAST ONE WINS"}
          </Label>
        </View>
        <Note>
          {m.id === "battle"
            ? "Anonymous voting. No self-votes. Shared wins welcome."
            : "Photos count unless challenged. Mock review resolves disputes."}
        </Note>
      </Card>
      <Button
        title="Create a room"
        icon="plus"
        onPress={() => {
          create(m.id);
          go("lobby");
        }}
      />
      <Button title="Join with a code" secondary onPress={() => go("join")} />
    </Shell>
  );
}
function Join() {
  const { create } = useGame();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function join() {
    setBusy(true);
    setError("");
    try {
      await demoService.join(code.trim().toUpperCase());
      create("album", true);
      go("lobby");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Shell title="Join your crew">
      <Art mode="album" large />
      <Title>Got an invite?</Title>
      <Body>Pop in your room code. The adventure is better together.</Body>
      <Field
        label="ROOM CODE"
        value={code}
        onChangeText={setCode}
        placeholder="JNGLE6"
      />
      <Button
        title="Paste code"
        secondary
        icon="clipboard"
        onPress={async () => setCode(await Clipboard.getStringAsync())}
      />
      {error && <Note error>{error}</Note>}
      <Button
        title="Join room"
        loading={busy}
        disabled={code.length < 6}
        onPress={join}
      />
      <Note>Demo room: JNGLE6 · Full room: FULL00 · Expired: EXPIRE</Note>
    </Shell>
  );
}
function Lobby() {
  const { game: g, send } = useGame();
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [guestReady, setGuestReady] = useState(false);
  const host = g.host === "0";
  useEffect(() => {
    if (!host) {
      const t = setTimeout(() => setGuestReady(true), 3000);
      return () => clearTimeout(t);
    }
  }, [host]);
  function start() {
    send({ type: "start" });
    go("game");
  }
  return (
    <Shell title="Base camp">
      <Label>{modes.find((m) => m.id === g.mode)?.title.toUpperCase()}</Label>
      <Title>The crew’s all here.</Title>
      <Body>Get your friends in. Let the hunt begin.</Body>
      <Card style={{ backgroundColor: C.green, borderColor: C.green }}>
        <Text
          style={{
            color: "#C5D6B1",
            fontFamily: F.bold,
            fontSize: 11,
            letterSpacing: 2,
          }}
        >
          YOUR PRIVATE ROOM
        </Text>
        <Text
          selectable
          style={{
            color: C.cream,
            fontFamily: F.title,
            fontSize: 44,
            letterSpacing: 6,
          }}
        >
          {g.code}
        </Text>
        <View style={s.row}>
          <View style={{ flex: 1 }}>
            <Button
              title={copied ? "Copied!" : "Copy code"}
              icon="copy"
              onPress={async () => {
                await Clipboard.setStringAsync(g.code);
                setCopied(true);
              }}
            />
          </View>
          <IconButton
            name="share-2"
            label="Share room"
            onPress={() => {
              void Share.share({
                message: `Join my iHunt room! Code: ${g.code}. Open iHunt and tap Join with Code.`,
              });
            }}
          />
        </View>
      </Card>
      <View style={s.spread}>
        <Label>YOUR CREW</Label>
        <Note>{g.players.length}/8 explorers</Note>
      </View>
      <Card>
        {g.players.map((p) => (
          <View key={p.id} style={s.spread}>
            <View style={s.row}>
              <Avatar name={p.name} color={p.color} />
              <Text style={st.bold}>
                {p.name}
                {p.id === "0" ? " (You)" : ""}
              </Text>
            </View>
            <Note>{g.host === p.id ? "HOST" : "Ready"}</Note>
          </View>
        ))}
        <Button
          title="Invite friends"
          secondary
          icon="user-plus"
          onPress={() => go("friends", { invite: "yes" })}
        />
      </Card>
      <Card>
        <View style={s.spread}>
          <Label>EXPEDITION SETTINGS</Label>
          {host && (
            <IconButton
              name="sliders"
              label="Edit game settings"
              onPress={() => setEditing(!editing)}
            />
          )}
        </View>
        <Body>
          {g.timer}s per round ·{" "}
          {g.mode === "battle" ? `${g.rounds} rounds` : `${g.maxLives} lives`}
        </Body>
        {editing && (
          <>
            <Label>ROUND TIMER</Label>
            <View style={s.row}>
              {[15, 30, 60].map((v) => (
                <Button
                  key={v}
                  title={`${v}s`}
                  secondary={g.timer !== v}
                  onPress={() =>
                    send({
                      type: "settings",
                      timer: v,
                      lives: g.maxLives,
                      rounds: g.rounds,
                    })
                  }
                />
              ))}
            </View>
            <Label>{g.mode === "battle" ? "ROUNDS" : "LIVES"}</Label>
            <View style={s.row}>
              {[1, 3, 5].map((v) => (
                <Button
                  key={v}
                  title={`${v}`}
                  onPress={() =>
                    send({
                      type: "settings",
                      timer: g.timer,
                      lives: g.mode === "battle" ? g.maxLives : v,
                      rounds: g.mode === "battle" ? v : g.rounds,
                    })
                  }
                />
              ))}
            </View>
          </>
        )}
      </Card>
      {host ? (
        <Button
          title="Start the hunt"
          icon="arrow-right"
          disabled={g.players.length < 2}
          onPress={start}
        />
      ) : (
        <>
          <Body center>Waiting for Stephen, the host.</Body>
          <Button
            title="Demo: host starts the game"
            disabled={!guestReady}
            onPress={start}
          />
        </>
      )}
      <Button
        title="Leave room"
        secondary
        onPress={() => {
          send({ type: "leave-lobby" });
          enterHome();
        }}
      />
      <Note>
        Demo: all three friends are simulated. If a host leaves, ownership
        transfers to Stephen.
      </Note>
    </Shell>
  );
}
function Friends() {
  const { invite } = useLocalSearchParams<{ invite?: string }>();
  const [search, setSearch] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const [pending, setPending] = useState(true);
  const [added, setAdded] = useState("");
  const friends = ["Stephen", "Edward", "Joshua"].filter((n) =>
    n.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <Shell title={invite ? "Invite your crew" : "Friends"}>
      <Title>Better together.</Title>
      <Body>Your next adventure is one invite away.</Body>
      <Field
        label="FIND A FRIEND"
        value={search}
        onChangeText={setSearch}
        placeholder="Search names"
      />
      {pending && (
        <Card>
          <Label>FRIEND REQUEST</Label>
          <View style={s.row}>
            <Avatar name="Alex" />
            <View style={{ flex: 1 }}>
              <Text style={st.bold}>Alex</Text>
              <Note>@alex.explores</Note>
            </View>
          </View>
          <Button
            title="Accept request"
            onPress={() => {
              setAdded("Alex");
              setPending(false);
            }}
          />
          <Button title="Decline" secondary onPress={() => setPending(false)} />
        </Card>
      )}
      <Label>YOUR CREW · {3 + (added ? 1 : 0)}</Label>
      {[
        ...friends,
        ...(added && added.toLowerCase().includes(search.toLowerCase())
          ? [added]
          : []),
      ].map((n, i) => (
        <Card key={n}>
          <View style={s.row}>
            <Avatar name={n} color={["#BDD9F2", "#FFBA95", "#C5D6B1"][i % 3]} />
            <View style={{ flex: 1 }}>
              <Text style={st.bold}>{n}</Text>
              <Note>
                {i === 1 ? "Away on an adventure" : "Online · ready to play"}
              </Note>
            </View>
            {invite && (
              <Button
                title={sent.includes(n) ? "Invited" : "Invite"}
                disabled={sent.includes(n)}
                onPress={() => setSent([...sent, n])}
              />
            )}
          </View>
        </Card>
      ))}
      {!friends.length && !added && (
        <Card>
          <Icon name="users" size={36} />
          <Title small>No explorers found.</Title>
          <Body>Try another name or add a friend below.</Body>
        </Card>
      )}
      <Button
        title="Add friend"
        icon="user-plus"
        secondary
        onPress={() => go("add-friend")}
      />
      <Note>Invitations and requests are local demo actions.</Note>
    </Shell>
  );
}
function AddFriend() {
  const [user, setUser] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <Shell title="Add friend">
      <Title>Grow your crew.</Title>
      <Field
        label="USERNAME OR EMAIL"
        value={user}
        onChangeText={setUser}
        placeholder="@yourfriend"
      />
      <Button
        title={sent ? "Request sent in demo" : "Send request"}
        disabled={!user.trim() || sent}
        onPress={() => setSent(true)}
      />
    </Shell>
  );
}
function Auth({ signup = false }: { signup?: boolean }) {
  const { setName } = useGame();
  const [name, setLocalName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit() {
    setBusy(true);
    setError("");
    try {
      if (signup && !name.trim()) throw Error("Enter your display name.");
      await demoService.authenticate(email, password);
      if (name.trim()) setName(name.trim());
      enterHome();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Shell title={signup ? "Create account" : "Welcome back"}>
      <Wordmark />
      <Art mode="album" large />
      {signup && (
        <Field
          label="DISPLAY NAME"
          value={name}
          onChangeText={setLocalName}
          placeholder="Zami"
        />
      )}
      <Field
        label="EMAIL"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="you@example.com"
      />
      <Field
        label="PASSWORD"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!show}
        placeholder="At least 8 characters"
      />
      <Pressable
        onPress={() => setShow(!show)}
        style={{ minHeight: 44, justifyContent: "center" }}
      >
        <Text style={st.bold}>{show ? "Hide" : "Show"} password</Text>
      </Pressable>
      {error && <Note error>{error}</Note>}
      <Button
        title={signup ? "Create account" : "Log in"}
        loading={busy}
        onPress={submit}
      />
      <Button
        title={signup ? "Already a member? Log in" : "Create an account"}
        secondary
        onPress={() =>
          router.replace({
            pathname: "/[page]",
            params: { page: signup ? "login" : "signup" },
          })
        }
      />
      {!signup && (
        <Button
          title="Forgot password?"
          secondary
          onPress={() => go("reset")}
        />
      )}
      <Button
        title="Explore the demo"
        icon="compass"
        secondary
        onPress={enterHome}
      />
      <Note>
        Demo only. No account is created and no credentials are stored.
      </Note>
    </Shell>
  );
}
function Reset() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <Shell title="Reset password">
      <Title>A fresh start.</Title>
      <Field
        label="EMAIL"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button
        title="Preview reset request"
        disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
        onPress={() => setDone(true)}
      />
      {done && (
        <Note>
          This is a demo. No email was sent. Use Explore the demo to play
          without an account.
        </Note>
      )}
    </Shell>
  );
}
function Profile() {
  const { name, setName } = useGame();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(name);
  return (
    <Shell title="Your explorer profile">
      <View style={st.artHero}>
        <Avatar name={name} size={104} />
        <Title>{name}</Title>
        <Body>@{name.toLowerCase().replace(/\s/g, "")}.explores</Body>
        <Label>ALWAYS UP FOR AN ADVENTURE</Label>
      </View>
      {edit && (
        <Field label="DISPLAY NAME" value={value} onChangeText={setValue} />
      )}
      <Button
        title={edit ? "Save profile" : "Edit profile"}
        secondary
        icon="edit-2"
        disabled={edit && !value.trim()}
        onPress={() => {
          if (edit) setName(value.trim());
          setEdit(!edit);
        }}
      />
      <Button
        title="Settings"
        icon="settings"
        secondary
        onPress={() => go("settings")}
      />
      <Button
        title="Log out of demo"
        secondary
        icon="log-out"
        onPress={() => router.replace("/")}
      />
    </Shell>
  );
}
function Settings() {
  const { haptics, setHaptics } = useGame();
  return (
    <Shell title="Settings">
      <Title>Your way to play.</Title>
      <Card>
        <View style={s.spread}>
          <Text style={st.bold}>Haptic feedback</Text>
          <Switch
            accessibilityLabel="Haptic feedback"
            value={haptics}
            onValueChange={(v) => {
              setHaptics(v);
              if (v && Platform.OS !== "web") void Haptics.selectionAsync();
            }}
            trackColor={{ true: C.leaf }}
          />
        </View>
        <Body>Feel a tap when you submit a photo on a supported phone.</Body>
      </Card>
      <Card>
        <Label>NOTIFICATIONS & SOUND</Label>
        <Body>
          Push notifications and game sounds aren’t connected in this demo.
        </Body>
      </Card>
      <Card>
        <Label>ACCOUNT</Label>
        <Body>
          You’re exploring with a local demo profile. No email or password is
          saved.
        </Body>
      </Card>
    </Shell>
  );
}
function GameScreen() {
  const { game: g, send, haptics } = useGame();
  const [now, setNow] = useState(() => Date.now());
  const [selected, setSelected] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const [challenge, setChallenge] = useState<Player | null>(null);
  const [vote, setVote] = useState("");
  const [connected, setConnected] = useState(true);
  const [failUpload, setFailUpload] = useState(false);
  useEffect(() => {
    const handler = BackHandler.addEventListener("hardwareBackPress", () => {
      setPreview("leave");
      return true;
    });
    return () => handler.remove();
  }, []);
  const me = g.players[0];
  const seconds = Math.max(0, Math.ceil((g.deadline - now) / 1000));
  const prompt = prompts[(g.round - 1) % prompts.length];
  const battle = g.mode === "battle";
  const alive = !me.departed && (me.lives > 0 || battle);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, []);

  async function pick(camera = false) {
    setError("");
    try {
      if (camera) {
        const permission = await Picker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          setError(
            "Camera permission denied. Enable it in your phone settings, or use the demo photo.",
          );
          return;
        }
      }
      const result = camera
        ? await Picker.launchCameraAsync({
            mediaTypes: ["images"],
            quality: 0.8,
          })
        : await Picker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 0.8,
          });
      if (!result.canceled) setSelected(result.assets[0].uri);
    } catch {
      setError(
        "The picker is unavailable here. Try on your phone, or use the demo photo.",
      );
    }
  }
  async function submit() {
    setBusy(true);
    setError("");
    try {
      const uri = await demoService.upload(failUpload ? "fail" : selected);
      if (Date.now() >= g.deadline)
        setError("Time is up. This photo did not make it into the round.");
      else {
        send({ type: "photo", id: "0", uri });
        if (haptics && Platform.OS !== "web")
          void Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success,
          );
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setFailUpload(false);
      setBusy(false);
    }
  }
  async function review(p: Player) {
    setChallenge(null);
    send({ type: "review", id: p.id, result: "checking" });
    const result = await demoService.review(p);
    send({ type: "review", id: p.id, result });
  }
  function leave() {
    setPreview("leave");
  }
  const ranking = g.players
    .filter((p) => !p.departed)
    .sort((a, b) => (battle ? b.score - a.score : b.lives - a.lives));
  const winners = ranking.filter((p) =>
    battle ? p.score === ranking[0].score : p.lives > 0,
  );
  const over = g.phase === "over";
  if (over)
    return (
      <Shell title="The finish line">
        <View style={[st.artHero, { backgroundColor: "#EAF0DD" }]}>
          <Icon name="award" size={64} />
          <Label>WHAT A HUNT.</Label>
          <Title>
            {winners.length === 0
              ? "It's a draw!"
              : winners.length > 1
                ? "A shared victory!"
                : `${winners[0].name} wins!`}
          </Title>
          <Body>Same crew. A whole new set of memories.</Body>
        </View>
        <Label>FINAL STANDINGS</Label>
        {ranking.map((p, i) => (
          <Card key={p.id}>
            <View style={s.spread}>
              <View style={s.row}>
                <Label>{i + 1}</Label>
                <Avatar name={p.name} color={p.color} />
                <Text style={st.bold}>{p.name}</Text>
              </View>
              <Label>{battle ? `${p.score} PTS` : `${p.lives} LIVES`}</Label>
            </View>
          </Card>
        ))}
        {ranking[0].photo && <Photo uri={ranking[0].photo} />}
        <Button
          title="Play again"
          icon="rotate-ccw"
          onPress={() => {
            send({ type: "rematch" });
            router.replace({
              pathname: "/[page]",
              params: { page: "lobby" },
            });
          }}
        />
        <Button title="Back to home" secondary onPress={enterHome} />
      </Shell>
    );
  return (
    <Shell title={modes.find((m) => m.id === g.mode)?.title} onBack={leave}>
      <View style={s.spread}>
        <View style={st.badge}>
          <Icon name="compass" size={15} />
          <Label>
            ROUND {String(g.round).padStart(2, "0")}
            {battle ? ` / ${g.rounds}` : ""}
          </Label>
        </View>
        <IconButton name="log-out" label="Leave game" onPress={leave} />
      </View>
      <View style={s.spread}>
        <View style={{ flex: 1 }}>
          <Label>
            {g.phase === "submission"
              ? "THE HUNT IS ON"
              : g.phase === "voting"
                ? "PICK YOUR FAVORITE"
                : g.phase === "summary"
                  ? "ROUND WRAP-UP"
                  : "THE BIG REVEAL"}
          </Label>
          <View style={{ height: 9 }} />
          <Title>{prompt}</Title>
        </View>
        <View
          accessibilityLabel={`${seconds} seconds remaining`}
          style={[st.timer, seconds <= 5 && { borderColor: C.orange }]}
        >
          <Text
            style={{
              fontFamily: F.title,
              color: C.green,
              fontSize: 32,
              fontVariant: ["tabular-nums"],
            }}
          >
            {seconds}
          </Text>
          <Text style={{ fontFamily: F.bold, fontSize: 9, color: C.muted }}>
            SECONDS
          </Text>
        </View>
      </View>
      <View style={st.players}>
        {g.players.map((p) => (
          <View key={p.id} style={{ alignItems: "center", gap: 5, flex: 1 }}>
            <Avatar name={p.name} color={p.color} size={40} />
            <Text
              numberOfLines={1}
              style={{ fontFamily: F.bold, fontSize: 10, color: C.green }}
            >
              {p.id === "0" ? "You" : p.name}
            </Text>
            {battle ? (
              <Note>{p.score} pts</Note>
            ) : (
              <View
                accessibilityLabel={`${p.lives} lives`}
                style={{ flexDirection: "row", gap: 2 }}
              >
                {Array.from({ length: g.maxLives }, (_, i) => (
                  <Heart key={i} filled={i < p.lives} />
                ))}
              </View>
            )}
            <Text style={{ fontFamily: F.body, color: C.muted, fontSize: 9 }}>
              {g.phase === "submission"
                ? p.photo
                  ? "Submitted"
                  : p.lives === 0 && !battle
                    ? "Spectating"
                    : "Hunting…"
                : ""}
            </Text>
          </View>
        ))}
      </View>
      {!connected && (
        <Card>
          <Label>Reconnecting…</Label>
          <Body>
            The shared deadline keeps running. Your phase and submitted photo
            are preserved.
          </Body>
          <Button title="Reconnect" onPress={() => setConnected(true)} />
        </Card>
      )}
      {g.phase === "submission" && (
        <>
          <Card style={{ padding: 10, borderWidth: 2, borderColor: C.green }}>
            {me.photo ? (
              <View style={{ padding: 26, gap: 16, alignItems: "center" }}>
                <View style={st.success}>
                  <Icon name="check" size={34} />
                </View>
                <Title small>You’re locked in.</Title>
                <Body center>
                  Photo submitted. Waiting for{" "}
                  {
                    g.players.filter((p) => !p.photo && (battle || p.lives > 0))
                      .length
                  }{" "}
                  players.
                </Body>
                <Note>Everyone’s photos reveal together.</Note>
              </View>
            ) : !alive ? (
              <View style={{ padding: 24, gap: 12 }}>
                <Icon name="eye" size={36} />
                <Title small>Enjoy the view.</Title>
                <Body>
                  You’re out of lives. Stick around and cheer on the crew.
                </Body>
              </View>
            ) : selected ? (
              <Photo uri={selected} height={260} />
            ) : (
              <View
                style={{
                  minHeight: 205,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  backgroundColor: "#EEF1E6",
                  borderRadius: 15,
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderColor: "#A9BA9F",
                }}
              >
                <Icon name={g.mode === "live" ? "camera" : "image"} size={38} />
                <Title small>Your next great find.</Title>
                <Body center>
                  {g.mode === "live"
                    ? "A fresh photo. Right here, right now."
                    : "The perfect photo is hiding in your library."}
                </Body>
              </View>
            )}
          </Card>
          {!me.photo && alive && (
            <>
              {selected ? (
                <>
                  <Button
                    title={busy ? "Submitting…" : "Submit photo"}
                    icon="check"
                    loading={busy}
                    disabled={!connected}
                    onPress={submit}
                  />
                  <Button
                    title={g.mode === "live" ? "Retake photo" : "Replace photo"}
                    secondary
                    onPress={() => pick(g.mode === "live")}
                  />
                </>
              ) : (
                <>
                  <Button
                    title={g.mode === "live" ? "Open camera" : "Choose a photo"}
                    icon={g.mode === "live" ? "camera" : "image"}
                    onPress={() => pick(g.mode === "live")}
                  />
                  {battle && (
                    <Button
                      title="Take a photo instead"
                      secondary
                      icon="camera"
                      onPress={() => pick(true)}
                    />
                  )}
                  <Button
                    title="Use a demo photo"
                    secondary
                    onPress={() =>
                      setSelected(photos[(g.round - 1) % photos.length])
                    }
                  />
                </>
              )}
              {error && <Note error>{error}</Note>}
              <Note>
                One photo. One shot at glory. You can replace it until you
                submit.
              </Note>
            </>
          )}
          <Pressable
            style={{ minHeight: 44, justifyContent: "center" }}
            onPress={() => setConnected(false)}
          >
            <Note>Demo tools: simulate disconnection</Note>
          </Pressable>
          {!me.photo && (
            <Button
              title={
                failUpload
                  ? "Next upload will fail · retry will work"
                  : "Demo: fail next upload"
              }
              secondary
              disabled={failUpload}
              onPress={() => setFailUpload(true)}
            />
          )}
        </>
      )}
      {["reveal", "voting"].includes(g.phase) && (
        <>
          <Body>
            {battle
              ? "Vote for the photo that best matches. Names stay hidden until voting ends."
              : "Think a photo misses the prompt? Challenge it before the timer ends."}
          </Body>
          {battle && g.players.filter((p) => p.photo).length < 2 && (
            <Note>Not enough photos to vote. No points will be awarded.</Note>
          )}
          <View style={st.grid}>
            {g.players.map((p, i) => (
              <View
                key={p.id}
                style={{
                  width: g.players.length === 2 ? "100%" : "48%",
                  backgroundColor: C.white,
                  borderWidth: 2,
                  borderColor: vote === p.id ? C.orange : C.line,
                  borderRadius: 18,
                  padding: 8,
                  gap: 9,
                }}
              >
                {p.photo ? (
                  <Pressable
                    accessibilityLabel={`Enlarge ${battle ? `Photo ${String.fromCharCode(65 + i)}` : p.name + " photo"}`}
                    onPress={() => setPreview(p.photo!)}
                  >
                    <Photo uri={p.photo} height={150} />
                  </Pressable>
                ) : (
                  <View
                    style={{
                      height: 150,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: C.pale,
                      borderRadius: 12,
                    }}
                  >
                    <Icon name="image" />
                    <Note>No submission</Note>
                  </View>
                )}
                <Text style={st.bold}>
                  {battle
                    ? p.id === "0"
                      ? "Your photo"
                      : `Photo ${String.fromCharCode(65 + i)}`
                    : p.name}
                </Text>
                {battle ? (
                  <Button
                    title={
                      g.votes["0"] === p.id
                        ? "Voted"
                        : vote === p.id
                          ? "Selected"
                          : "Select"
                    }
                    secondary
                    disabled={p.id === "0" || !p.photo || !!g.votes["0"]}
                    onPress={() => setVote(p.id)}
                  />
                ) : (
                  <>
                    <Note>
                      {p.review === "accepted"
                        ? "Accepted · matches the prompt"
                        : p.review === "rejected"
                          ? "Rejected · misses the prompt"
                          : p.review === "unavailable"
                            ? "Review unavailable · life preserved"
                            : p.review === "checking"
                              ? "Checking photo…"
                              : p.photo
                                ? "Counts unless challenged"
                                : "Missed · loses one life"}
                    </Note>
                    {p.photo && p.id !== "0" && (
                      <Button
                        title={p.review ? "Reviewed" : "Challenge"}
                        icon="thumbs-down"
                        secondary
                        disabled={!!p.review || seconds === 0}
                        onPress={() => setChallenge(p)}
                      />
                    )}
                  </>
                )}
              </View>
            ))}
          </View>
          {battle &&
            (g.votes["0"] ? (
              <Card>
                <Label>VOTE SUBMITTED</Label>
                <Body>Waiting for the rest of the crew.</Body>
              </Card>
            ) : (
              <Button
                title="Confirm vote"
                disabled={!vote || seconds === 0 || !connected}
                onPress={() => send({ type: "vote", voter: "0", target: vote })}
              />
            ))}
          {seconds === 0 && <Note>Resolving remaining reviews…</Note>}
        </>
      )}
      {g.phase === "summary" && (
        <>
          <Title small>
            {battle ? "The votes are in." : "Another round in the wild."}
          </Title>
          {g.players.map((p) => (
            <Card key={p.id}>
              <View style={s.spread}>
                <View style={s.row}>
                  <Avatar name={p.name} color={p.color} />
                  <View>
                    <Text style={st.bold}>{p.name}</Text>
                    <Note>
                      {battle
                        ? `${Object.values(g.votes).filter((id) => id === p.id).length} votes this round`
                        : !p.photo
                          ? "Missed · −1 life"
                          : p.review === "rejected"
                            ? "Rejected · −1 life"
                            : p.review === "unavailable"
                              ? "Review unavailable · life preserved"
                              : "Accepted · life preserved"}
                    </Note>
                  </View>
                </View>
                <Label>
                  {battle
                    ? `${p.score} PTS`
                    : p.lives
                      ? `${p.lives} LIVES`
                      : "OUT"}
                </Label>
              </View>
              {p.photo && <Photo uri={p.photo} height={120} />}
            </Card>
          ))}
          <Body center>Next round in {seconds}s</Body>
          <Button title="Continue" onPress={() => send({ type: "next" })} />
        </>
      )}
      <Note>
        DEMO ROOM · Simulated players, uploads, votes, and AI reviews.
      </Note>
      <Modal
        visible={!!preview || !!challenge}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setPreview("");
          setChallenge(null);
        }}
      >
        <View style={st.scrim}>
          <View style={{ width: "100%", maxWidth: 460 }}>
            <Card>
              {preview === "leave" ? (
                <>
                  <Title small>Leave the expedition?</Title>
                  <Body>
                    Leaving an active game is a forfeit. Your crew can finish
                    the hunt.
                  </Body>
                  <Button
                    title="Leave game"
                    onPress={() => {
                      send({ type: "forfeit" });
                      setPreview("");
                      enterHome();
                    }}
                  />
                  <Button
                    title="Keep hunting"
                    secondary
                    onPress={() => setPreview("")}
                  />
                </>
              ) : challenge ? (
                <>
                  <Icon name="thumbs-down" size={32} />
                  <Title small>Does this photo miss the prompt?</Title>
                  <Body>Mock AI will check whether it matches “{prompt}”</Body>
                  <Note>
                    Demo outcomes: Stephen accepted, Edward rejected, Joshua
                    unavailable. Unavailable reviews preserve lives.
                  </Note>
                  <Button
                    title="Request review"
                    onPress={() => review(challenge)}
                  />
                  <Button
                    title="Cancel"
                    secondary
                    onPress={() => setChallenge(null)}
                  />
                </>
              ) : (
                <>
                  <Photo uri={preview} height={380} />
                  <Button
                    title="Close photo"
                    secondary
                    onPress={() => setPreview("")}
                  />
                </>
              )}
            </Card>
          </View>
        </View>
      </Modal>
    </Shell>
  );
}
function GameRound() {
  const { game } = useGame();
  return <GameScreen key={game.round} />;
}
export function Screens({ screen }: { screen: string }) {
  switch (screen) {
    case "home":
      return <Home />;
    case "mode":
      return <ModeDetails />;
    case "join":
      return <Join />;
    case "lobby":
      return <Lobby />;
    case "friends":
      return <Friends />;
    case "add-friend":
      return <AddFriend />;
    case "profile":
      return <Profile />;
    case "settings":
      return <Settings />;
    case "login":
      return <Auth />;
    case "signup":
      return <Auth signup />;
    case "reset":
      return <Reset />;
    case "game":
      return <GameRound />;
    default:
      return <Home />;
  }
}
const st = StyleSheet.create({
  screenBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  fixedScreen: {
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
    backgroundColor: C.cream,
  },
  welcomeContent: {
    flex: 1,
    minHeight: 0,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: "space-between",
    gap: 12,
  },
  welcomeArt: {
    flex: 1,
    minHeight: 0,
    maxHeight: 260,
    backgroundColor: "#EAF0DD",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: C.green,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  welcomeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    backgroundColor: C.yellow,
    borderRadius: 12,
  },
  container: {
    flex: 1,
    minHeight: 0,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: { padding: 24, paddingTop: 8, gap: 24, paddingBottom: 36 },
  homeContent: {
    flex: 1,
    minHeight: 0,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 12,
  },
  mode: {
    paddingLeft: 20,
    paddingRight: 8,
    paddingVertical: 6,
    flex: 1,
    minHeight: 0,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: C.green,
    borderRadius: 23,
    boxShadow: "0px 4px 0px #123D2A",
  },
  play: { flexDirection: "row", alignItems: "center", gap: 9, marginTop: 5 },
  bold: { fontFamily: F.bold, color: C.green, fontSize: 13 },
  small: { fontFamily: F.body, fontSize: 11, color: C.muted },
  artHero: {
    borderRadius: 24,
    padding: 24,
    gap: 16,
    alignItems: "center",
    backgroundColor: "#EAF0DD",
  },
  number: {
    width: 38,
    height: 38,
    backgroundColor: C.yellow,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: C.green,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: C.yellow,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: C.green,
  },
  timer: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 7,
    borderColor: C.green,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF0DD",
  },
  players: {
    flexDirection: "row",
    paddingVertical: 16,
    backgroundColor: "#EAF0DD",
    borderRadius: 20,
  },
  success: {
    height: 76,
    width: 76,
    backgroundColor: C.leaf,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: C.green,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  scrim: {
    flex: 1,
    backgroundColor: "#123D2ACC",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
